import type { ReactNode } from "react";

export function Pill({ children, tone = "tint", className = "" }: { children: ReactNode; tone?: "tint" | "dark" | "outline"; className?: string }) {
  const tones = {
    tint: "bg-tint text-brand",
    dark: "bg-white/10 text-white ring-1 ring-white/25",
    outline: "border border-line text-body",
  };
  return <span className={`inline-flex w-fit rounded-full px-3.5 py-1.5 text-xs font-semibold ${tones[tone]} ${className}`}>{children}</span>;
}
