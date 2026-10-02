import Link from "next/link";
import { site } from "@/lib/site";

type WordmarkProps = {
  className?: string;
  /** Use on dark backgrounds. */
  inverted?: boolean;
};

/**
 * Brand mark. Text-only until a logo exists — to add one later, render a
 * next/image here (keep the sr-only name for accessibility).
 */
export function Wordmark({ className = "", inverted = false }: WordmarkProps) {
  return (
    <Link
      href="/"
      title={`${site.name} — home`}
      className={`inline-flex items-baseline gap-1.5 font-mono font-semibold tracking-tight ${
        inverted ? "text-white" : "text-brand-900"
      } ${className}`}
    >
      <span className="text-lg sm:text-xl">Anchorstone</span>{" "}
      <span
        className={`text-[0.7rem] font-medium uppercase tracking-[0.2em] ${
          inverted ? "text-brand-200" : "text-brand-500"
        }`}
      >
        Capital Ltd
      </span>
    </Link>
  );
}
