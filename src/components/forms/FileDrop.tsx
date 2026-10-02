"use client";

import { useState, type DragEvent } from "react";
import { FieldError, RequiredMark } from "./Field";
import { DocumentIcon } from "@/components/ui/icons";

type FileDropProps = {
  id: string;
  label: string;
  hint: string;
  accept: string;
  maxFiles: number;
  files: File[];
  onChange: (files: File[]) => void;
  required?: boolean;
  error?: string;
};

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/**
 * Drag-and-drop or click-to-choose upload. Keeps files in React state only —
 * type/size/count are validated centrally by the form schema.
 */
export function FileDrop({ id, label, hint, accept, maxFiles, files, onChange, required, error }: FileDropProps) {
  const [dragging, setDragging] = useState(false);
  const multiple = maxFiles > 1;

  const add = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const list = Array.from(incoming);
    // Single-file fields replace; multi-file fields append (de-duplicated by name + size).
    const next = multiple
      ? [...files, ...list.filter((f) => !files.some((x) => x.name === f.name && x.size === f.size))]
      : list.slice(0, 1);
    onChange(next);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    add(e.dataTransfer.files);
  };

  const describedBy = [`${id}-hint`, error ? `${id}-error` : null].filter(Boolean).join(" ");

  return (
    <div>
      <p className="font-mono text-sm font-medium text-brand-900" id={`${id}-label`}>
        {label}
        {required && <RequiredMark />}
      </p>

      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-6 text-center transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100 ${
          dragging
            ? "border-brand-500 bg-brand-50"
            : error
              ? "border-danger/60 bg-white hover:bg-lavender-50"
              : "border-brand-200 bg-white hover:border-brand-400 hover:bg-lavender-50"
        }`}
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-sm text-ink-700">
          <span className="font-medium text-brand-700 underline underline-offset-2">Choose {multiple ? "files" : "a file"}</span>{" "}
          or drag and drop
        </span>
        <span id={`${id}-hint`} className="text-xs text-ink-500">
          {hint}
        </span>
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          aria-labelledby={`${id}-label`}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className="sr-only"
          onChange={(e) => {
            add(e.target.files);
            e.target.value = ""; // allow re-selecting the same file after removing it
          }}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-3 rounded-xl border border-line bg-lavender-50 px-3 py-2.5 text-sm"
            >
              <DocumentIcon className="size-5 shrink-0 text-brand-600" />
              <span className="min-w-0 flex-1 truncate text-ink-700">{file.name}</span>
              <span className="shrink-0 font-mono text-xs text-ink-500">{formatSize(file.size)}</span>
              <button
                type="button"
                onClick={() => onChange(files.filter((_, j) => j !== i))}
                className="shrink-0 rounded-full p-1 text-ink-500 transition hover:bg-white hover:text-danger"
                aria-label={`Remove ${file.name}`}
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}
