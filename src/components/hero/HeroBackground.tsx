import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { FloatingDecor } from "@/components/effects/FloatingDecor";

/**
 * CSS-only hero backdrop (renders instantly, before any WebGL):
 * navy gradient → vignette → film grain → soft scrim behind the copy.
 * `showStaticScene` adds static SVG waves and CSS-drawn objects — shown until the WebGL scene is
 * ready (and permanently when WebGL is unavailable or software-only); it fades out smoothly.
 */

// ─── Tweakables ──────────────────────────────────────────────────────────────
/** Film-grain opacity (0–1). */
const GRAIN_OPACITY = 0.07;
/** Number of static fallback wave lines. */
const FALLBACK_LINES = 14;

export function HeroBackground({ showStaticScene }: { showStaticScene: boolean }) {
  return (
    <div aria-hidden="true" className="hero-fade-in absolute inset-0 -z-10">
      {/* Base: navy core shifting to near-black at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,var(--color-brand-800)_0%,var(--color-brand-900)_38%,var(--color-brand-950)_70%,var(--color-night)_100%)]" />
      {/* Soft lavender glow where the wave ribbon sits */}
      <div className="absolute inset-x-0 bottom-[8%] h-[45%] bg-[radial-gradient(60%_60%_at_50%_70%,color-mix(in_oklab,var(--color-brand-400)_28%,transparent),transparent_70%)]" />
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-out ${showStaticScene ? "opacity-100" : "opacity-0"}`}>
        <FallbackScene />
      </div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_45%,transparent_55%,rgb(0_0_0/0.55)_100%)]" />
      <NoiseOverlay opacity={GRAIN_OPACITY} />
    </div>
  );
}

/** Static stand-in for the WebGL layers: glowing SVG ribbon + CSS-drawn coins, spheres and anchor stone. */
function FallbackScene() {
  const lines = Array.from({ length: FALLBACK_LINES }, (_, i) => {
    const t = i / (FALLBACK_LINES - 1);
    const y = 560 + (t - 0.5) * 120;
    return `M-50 ${y} C 350 ${y - 140 + t * 60}, 700 ${y + 120 - t * 50}, 1050 ${y - 30} S 1400 ${y - 90}, 1500 ${y - 40}`;
  });
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hero-fallback-line" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-brand-400)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--color-brand-200)" stopOpacity="0.7" />
            <stop offset="1" stopColor="var(--color-brand-400)" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-fallback-glow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" stroke="url(#hero-fallback-line)" strokeWidth="1.2" filter="url(#hero-fallback-glow)">
          {lines.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>
      {/* CSS stand-ins placed where the 3D objects sit */}
      <FloatingDecor kind="coin" size={120} className="top-[24%] left-[6%]" speed={0.6} />
      <FloatingDecor kind="coin" size={52} className="bottom-[28%] left-[19%]" speed={0.9} delay={3} />
      <FloatingDecor kind="glass" size={100} className="top-[17%] right-[7%]" speed={0.5} delay={1.5} />
      <FloatingDecor kind="glass" size={40} className="top-[11%] right-[28%]" speed={0.3} delay={5} />
      <FloatingDecor kind="stone" size={150} className="right-[10%] bottom-[24%]" speed={0.8} delay={2.5} />
      <FloatingDecor kind="coin" size={56} className="top-[15%] left-[8%] md:hidden" speed={0.4} showOnMobile />
      <FloatingDecor kind="stone" size={84} className="right-[12%] bottom-[16%] md:hidden" speed={0.4} showOnMobile />
    </>
  );
}
