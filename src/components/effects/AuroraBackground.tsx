import type { CSSProperties } from "react";

type AuroraProps = {
  /** "dark" for navy headers, "light" for white/lavender sections. */
  tone?: "dark" | "light";
  className?: string;
};

// Blob layout: position, size, colour class, drift direction and delay.
const BLOBS = [
  { pos: "-top-1/4 -left-1/6 size-[55%]", dark: "bg-brand-500/45", light: "bg-brand-200/60", x: "10%", y: "8%", delay: "0s" },
  { pos: "top-1/4 -right-1/6 size-[50%]", dark: "bg-brand-300/30", light: "bg-lavender-200/90", x: "-12%", y: "-6%", delay: "-6s" },
  { pos: "-bottom-1/3 left-1/4 size-[45%]", dark: "bg-brand-700/60", light: "bg-brand-100/80", x: "8%", y: "-10%", delay: "-12s" },
];

/** Slow-moving blurred gradient blobs (pure CSS, transform-only animation). */
export function AuroraBackground({ tone = "dark", className = "" }: AuroraProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className={`aurora-blob absolute rounded-full blur-3xl ${b.pos} ${tone === "dark" ? b.dark : b.light}`}
          style={{ "--blob-x": b.x, "--blob-y": b.y, "--blob-delay": b.delay } as CSSProperties}
        />
      ))}
    </div>
  );
}
