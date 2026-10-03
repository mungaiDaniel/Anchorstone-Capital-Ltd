import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  /** Items rendered as list entries (the list is duplicated for a seamless loop). */
  items: ReactNode[];
  /** Seconds per loop; default from motion tokens (`effect.marqueeSeconds`). */
  seconds?: number;
  /** Gap between items, any CSS length. */
  gap?: string;
  /** Fade the left/right edges. */
  fadeEdges?: boolean;
  className?: string;
  itemClassName?: string;
};

/**
 * Infinite auto-scrolling strip (pure CSS). Pauses on hover/focus; with reduced motion it
 * becomes a static wrapped list. The duplicate copy is hidden from screen readers.
 */
export function Marquee({ items, seconds, gap = "0.75rem", fadeEdges = true, className = "", itemClassName = "" }: MarqueeProps) {
  const vars = { "--marquee-gap": gap, ...(seconds ? { "--marquee-duration": `${seconds}s` } : {}) } as CSSProperties;
  return (
    <div
      className={`marquee relative overflow-hidden ${fadeEdges ? "mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" : ""} ${className}`}
      style={vars}
    >
      <div className="marquee-track flex w-max" style={{ gap }}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-copy flex shrink-0" style={{ gap }} aria-hidden={copy === 1 || undefined}>
            {items.map((item, i) => (
              <li key={i} className={`shrink-0 ${itemClassName}`}>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
