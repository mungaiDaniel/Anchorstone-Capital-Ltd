import type { ReactNode } from "react";

/** Small uppercase, letter-spaced label above a serif heading. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  /** "light" = on a light background, "dark" = on navy. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-soft" : "text-brand"} ${className}`}>
      <span aria-hidden="true" className={`h-px w-8 ${tone === "dark" ? "bg-soft/60" : "bg-brand/40"}`} />
      {children}
    </p>
  );
}
