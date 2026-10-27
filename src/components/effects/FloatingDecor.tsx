import type { CSSProperties } from "react";
import { Parallax } from "@/components/motion/Parallax";

type Kind = "coin" | "glass" | "stone";

type FloatingDecorProps = {
  kind: Kind;
  /** Diameter in px. */
  size?: number;
  /** Positioning classes, e.g. "top-10 -right-6". */
  className?: string;
  /** Parallax speed (see <Parallax>). */
  speed?: number;
  /** Bob phase offset in seconds. */
  delay?: number;
  /** Decor is hidden on small screens unless this is set. */
  showOnMobile?: boolean;
};

const looks: Record<Kind, string> = {
  coin: "rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--color-accent-gold)_30%,white),var(--color-accent-gold)_38%,color-mix(in_oklab,var(--color-accent-gold)_55%,black)_100%)] shadow-[0_18px_40px_-12px_rgb(0_0_0/0.45),inset_0_0_0_3px_color-mix(in_oklab,var(--color-accent-gold)_70%,white)]",
  glass:
    "rounded-full bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.9),color-mix(in_oklab,var(--color-brand-200)_80%,transparent)_28%,color-mix(in_oklab,var(--color-brand-500)_55%,transparent)_78%)] shadow-[0_18px_40px_-14px_color-mix(in_oklab,var(--color-brand-700)_60%,transparent)] backdrop-blur-sm",
  stone:
    "rounded-[46%_54%_50%_50%/58%_52%_48%_42%] bg-[radial-gradient(ellipse_at_35%_30%,var(--color-brand-500),var(--color-brand-800)_60%,var(--color-brand-950))] shadow-[0_20px_40px_-14px_rgb(0_0_0/0.5)]",
};

/**
 * CSS-drawn coin / glass sphere / anchor stone that echo the hero's 3D objects.
 * Bobs gently and drifts with scroll parallax. Purely decorative; use sparingly at section edges.
 */
export function FloatingDecor({ kind, size = 72, className = "", speed = 0.4, delay = 0, showOnMobile = false }: FloatingDecorProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${showOnMobile ? "" : "max-md:hidden"} ${className}`}>
      <Parallax speed={speed}>
        <div
          className={`float-bob relative ${looks[kind]}`}
          style={{ width: size, height: kind === "stone" ? size * 0.72 : size, "--bob-delay": `${-delay}s` } as CSSProperties}
        >
          {kind === "coin" && (
            <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-[color-mix(in_oklab,var(--color-accent-gold)_45%,black)]" style={{ fontSize: size * 0.4 }}>
              A
            </span>
          )}
          {kind === "stone" && (
            <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto h-1/2 w-1/2 fill-none stroke-accent-gold" strokeWidth="1.6" strokeLinecap="round">
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v13M8 10h8M5 14a7 7 0 0 0 14 0" />
            </svg>
          )}
        </div>
      </Parallax>
    </div>
  );
}
