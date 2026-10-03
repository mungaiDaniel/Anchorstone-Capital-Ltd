/**
 * Motion tokens — the single source of truth for every animation on the site.
 * Components import from here; nothing else hardcodes durations, easings or distances.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ MOTION_INTENSITY: one dial for the whole site.                           │
 * │   0    → static (like prefers-reduced-motion)                            │
 * │   0.6  → calm        1 → default        1.4 → energetic                  │
 * │ Scales distances, parallax, tilt, magnetism and the hero's speed.        │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
export const MOTION_INTENSITY: number = 1;

const k = MOTION_INTENSITY;

/** Cubic-bezier curves (arrays for Motion, strings for CSS). */
export const ease = {
  /** Default: fast start, long soft landing. */
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Symmetric, for loops and wipes. */
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};
export const cssEase = (curve: readonly number[]) => `cubic-bezier(${curve.join(",")})`;

/** Durations in seconds. */
export const duration = {
  fast: 0.3,
  base: 0.7,
  slow: 1.1,
  /** Page transition wipe. */
  page: 0.6,
};

/** Spring presets for Motion's `transition={{ type: "spring", ...spring.x }}`. */
export const spring = {
  /** Snappy UI feedback (magnetic buttons, cursor). */
  snappy: { stiffness: 260, damping: 22, mass: 0.6 },
  /** Soft floaty follow (tilt, parallax smoothing). */
  soft: { stiffness: 120, damping: 20, mass: 1 },
  /** Progress bars. */
  progress: { stiffness: 140, damping: 30, restDelta: 0.001 },
};

/** Stagger steps in seconds. */
export const stagger = {
  /** Between cards / list items. */
  items: 0.09,
  /** Between words in <SplitText>. */
  words: 0.06,
  /** Between lines in <SplitText mode="lines">. */
  lines: 0.14,
};

/** Distances in px, scaled by intensity. */
export const distance = {
  reveal: 28 * k,
  revealSide: 40 * k,
  /** Max px a <Parallax> layer travels per unit of `speed`. */
  parallax: 120 * k,
  /** Max px a <Magnetic> element follows the cursor. */
  magnetic: 10 * k,
};

/** Effect strengths, scaled by intensity. */
export const effect = {
  /** <TiltCard> max rotation (degrees). */
  tiltDeg: 7 * k,
  /** Blur (px) at the start of blur-in reveals and SplitText. */
  blurPx: 10,
  /** Scale at the start of `scale` reveals. */
  revealScale: 1 - 0.06 * k,
  /** Marquee: seconds per loop (higher = slower). */
  marqueeSeconds: 45 / Math.max(k, 0.2),
  /** Aurora blob drift loop (seconds). */
  auroraSeconds: 26 / Math.max(k, 0.2),
};

/** Viewport trigger: reveal when the element is 12% inside the viewport (from the bottom). */
export const viewport = {
  rootMargin: "0px 0px -12% 0px",
  threshold: 0,
};

/** Mobile gets lighter versions of pointer/parallax effects. */
export const MOBILE_FACTOR = 0.5;
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/** Writes the tokens CSS needs (reveals, marquee, aurora) as custom properties on <html>. */
export function motionCssVariables(): Record<string, string> {
  return {
    "--motion-ease": cssEase(ease.out),
    "--motion-ease-in-out": cssEase(ease.inOut),
    "--motion-fast": `${duration.fast}s`,
    "--motion-base": `${duration.base}s`,
    "--motion-slow": `${duration.slow}s`,
    "--motion-distance": `${distance.reveal}px`,
    "--motion-distance-side": `${distance.revealSide}px`,
    "--motion-blur": `${effect.blurPx}px`,
    "--motion-scale": `${effect.revealScale}`,
    "--motion-stagger": `${stagger.items}s`,
    "--motion-word-stagger": `${stagger.words}s`,
    "--motion-line-stagger": `${stagger.lines}s`,
    "--marquee-s": `${effect.marqueeSeconds}s`,
    "--aurora-s": `${effect.auroraSeconds}s`,
  };
}
