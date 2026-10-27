// ─── Tweakables ──────────────────────────────────────────────────────────────
const LINES = 12;
/** One seamless tile; the SVG is two tiles wide and drifts left by one tile per loop. */
const TILE = 1440;
const PERIOD = 720; // wave length — must divide TILE for a seamless loop

/** Builds one sine-ish line across two tiles (sampled every 24px). */
function wavePath(i: number, height: number) {
  const t = i / (LINES - 1);
  const base = height * 0.55 + (t - 0.5) * height * 0.35;
  const amp = height * (0.12 + 0.1 * Math.sin(t * Math.PI));
  const phase = t * 1.6;
  let d = "";
  for (let x = 0; x <= TILE * 2; x += 24) {
    const a = (x / PERIOD) * Math.PI * 2 + phase;
    const y = base + Math.sin(a) * amp + Math.sin(a * 2 + t * 4) * amp * 0.18;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
  }
  return d;
}

type WaveRibbonProps = {
  tone?: "dark" | "light";
  /** Height of the SVG's coordinate space (shape of the ribbon, not the rendered size). */
  height?: number;
  className?: string;
};

/**
 * The hero's glowing wave ribbon in a calm, lightweight SVG form for page headers
 * (no WebGL). Drifts slowly via a CSS transform loop; static with reduced motion.
 */
export function WaveRibbon({ tone = "dark", height = 320, className = "" }: WaveRibbonProps) {
  const id = `wave-${tone}`;
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`}>
      <svg
        className="wave-drift h-full w-[200%]"
        viewBox={`0 0 ${TILE * 2} ${height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={tone === "dark" ? "var(--color-brand-200)" : "var(--color-brand-400)"} />
            <stop offset="1" stopColor={tone === "dark" ? "var(--color-brand-400)" : "var(--color-brand-200)"} />
          </linearGradient>
        </defs>
        <g stroke={`url(#${id})`} strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity={tone === "dark" ? 0.55 : 0.7}>
          {Array.from({ length: LINES }, (_, i) => (
            <path key={i} d={wavePath(i, height)} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
    </div>
  );
}
