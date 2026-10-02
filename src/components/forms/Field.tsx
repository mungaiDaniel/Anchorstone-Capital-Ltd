import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Shared input styling; pass `invalid` to switch to the error state. */
export const inputClasses = (invalid?: boolean) =>
  `block w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink-900 shadow-[inset_0_1px_2px_rgb(0_13_82/0.04)] outline-none transition placeholder:text-ink-500/70 focus:ring-4 ${
    invalid
      ? "border-danger focus:border-danger focus:ring-danger/15"
      : "border-line hover:border-brand-200 focus:border-brand-500 focus:ring-brand-100"
  }`;

/** ids for aria-describedby: hint + error, only when present. */
export const describedBy = (id: string, hint?: ReactNode, error?: string) =>
  [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

export function RequiredMark() {
  return (
    <span aria-hidden="true" className="ml-0.5 text-accent-orange">
      *
    </span>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M10 1.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zM9.25 6a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0V6zM10 14.75a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
      {error}
    </p>
  );
}

type FieldProps = {
  id: string;
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label + hint + control + error, wired for screen readers. */
export function Field({ id, label, required, hint, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-mono text-sm font-medium text-brand-900">
        {label}
        {required && <RequiredMark />}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-ink-500">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

type TextInputProps = ComponentPropsWithoutRef<"input"> & { invalid?: boolean; prefix?: string };

export function TextInput({ invalid, prefix, className = "", ...props }: TextInputProps) {
  if (!prefix) return <input className={`${inputClasses(invalid)} ${className}`} {...props} />;
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-4 flex items-center font-mono text-sm text-ink-500"
      >
        {prefix}
      </span>
      <input className={`${inputClasses(invalid)} pl-14 ${className}`} {...props} />
    </div>
  );
}

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean };

export function TextArea({ invalid, className = "", ...props }: TextAreaProps) {
  return <textarea className={`${inputClasses(invalid)} min-h-36 resize-y ${className}`} {...props} />;
}
