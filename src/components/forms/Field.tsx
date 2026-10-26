import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Shared control styling; `invalid` switches to the error state. */
export const inputClasses = (invalid?: boolean) =>
  `block w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition placeholder:text-muted/70 focus:ring-4 ${
    invalid ? "border-danger focus:border-danger focus:ring-danger/15" : "border-line hover:border-brand/40 focus:border-brand focus:ring-tint-2"
  }`;

const describedBy = (id: string, hint?: ReactNode, error?: string) =>
  [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-danger">
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
  /** Render-prop so the control gets the right aria attributes. */
  children: (aria: { id: string; "aria-invalid": boolean | undefined; "aria-describedby": string | undefined; "aria-required": boolean | undefined }) => ReactNode;
};

/** Label + hint + control + error, wired for screen readers. */
export function Field({ id, label, required, hint, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-brand">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {children({
          id,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy(id, hint, error),
          "aria-required": required || undefined,
        })}
      </div>
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

export function TextInput({ invalid, className = "", ...props }: ComponentPropsWithoutRef<"input"> & { invalid?: boolean }) {
  return <input className={`${inputClasses(invalid)} ${className}`} {...props} />;
}

export function TextArea({ invalid, className = "", ...props }: ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean }) {
  return <textarea className={`${inputClasses(invalid)} min-h-36 resize-y ${className}`} {...props} />;
}

export function Select({ invalid, className = "", children, ...props }: ComponentPropsWithoutRef<"select"> & { invalid?: boolean }) {
  return (
    <select className={`${inputClasses(invalid)} h-12 py-0 ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Checkbox({
  id,
  name,
  error,
  children,
  defaultChecked,
}: {
  id: string;
  name: string;
  error?: string;
  children: ReactNode;
  defaultChecked?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-body">
        <input
          id={id}
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-[var(--color-brand)]"
        />
        <span>{children}</span>
      </label>
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

/** Hidden from people (and assistive tech); bots tend to fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
