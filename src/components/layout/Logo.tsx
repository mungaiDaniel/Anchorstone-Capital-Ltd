import Image from "next/image";
import Link from "next/link";

/**
 * Brand logo. Full lockup from `sm` up; the A/C monogram below that if the lockup is too wide.
 * `tone="dark"` = white logo for navy backgrounds. Never recoloured or stretched.
 */
export function Logo({ tone = "light", className = "", compact = false }: { tone?: "light" | "dark"; className?: string; compact?: boolean }) {
  const suffix = tone === "dark" ? "white" : "blue";
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src={`/brand/logo_mono_${suffix}.png`}
        alt="Anchorstone Capital Limited"
        width={420}
        height={545}
        priority
        sizes="40px"
        className="h-10 w-auto sm:hidden"
      />
      <Image
        src={`/brand/logo_full_${suffix}.png`}
        alt="Anchorstone Capital Limited"
        width={1202}
        height={775}
        priority
        sizes="96px"
        className={`hidden w-auto sm:block ${compact ? "h-12" : "h-14"}`}
      />
    </Link>
  );
}
