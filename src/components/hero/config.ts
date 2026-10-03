/**
 * Hero tuning — the one place to tweak speed, intensity and counts.
 * Colours are NOT defined here: they're read at runtime from the theme tokens in
 * globals.css (see `readThemeColors`), so the 3D scene always matches the brand.
 */

import { MOTION_INTENSITY } from "@/lib/motion";

/** Global time multiplier for everything in the 3D scene — follows the site-wide MOTION_INTENSITY. */
export const HERO_SPEED = MOTION_INTENSITY;

export const WAVES = {
  /** Glowing lines in the ribbon (mobile uses `linesMobile`). */
  lines: 26,
  linesMobile: 12,
  /** Horizontal flow speed. */
  speed: 0.12,
  /** Brightness of each line (0–1+). */
  intensity: 0.9,
  /** Vertical centre of the ribbon, 0 = bottom, 1 = top. */
  centerY: 0.24,
  /** How far the ribbon fans out vertically. */
  spread: 0.2,
};

export const PARTICLES = {
  count: 140,
  countMobile: 55,
  /** Upward drift speed (scene units / second). */
  riseSpeed: 0.12,
  /** Share of particles drawn larger and softer (out-of-focus). */
  blurredShare: 0.18,
};

export const OBJECTS = {
  /** Float bob amplitude and speed. */
  bobAmplitude: 0.18,
  bobSpeed: 0.55,
  /** Slow self-rotation speed. */
  spinSpeed: 0.18,
  /** Mouse parallax strength (multiplied by each object's depth factor). */
  parallax: 0.55 * MOTION_INTENSITY,
  /** How far objects drift upward while the hero scrolls away. */
  scrollDrift: 2.2,
  /** Entrance: delay between objects (s) and spring stiffness. */
  stagger: 0.12,
  springStiffness: 90,
  springDamping: 13,
  /** CSS blur (px) of the foreground "out-of-focus" layer (desktop only). */
  nearBlurPx: 6,
};

export const RENDER = {
  /** devicePixelRatio caps. */
  dprDesktop: [1, 1.5] as [number, number],
  dprMobile: [1, 1.25] as [number, number],
  /** If the average frame time exceeds this (ms), quality steps down (DPR 1, fewer lines). */
  slowFrameMs: 24,
};

/** Breakpoint below which the lighter "mobile" scene is used. */
export const MOBILE_QUERY = "(max-width: 767px)";

export type ThemeColors = {
  navyDeep: string;
  navy: string;
  navyBright: string;
  lavender: string;
  lavenderSoft: string;
  gold: string;
};

/** Reads brand colours from the CSS custom properties defined in globals.css. */
export function readThemeColors(): ThemeColors {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  return {
    navyDeep: v("--color-brand-950"),
    navy: v("--color-brand-700"),
    navyBright: v("--color-brand-400"),
    lavender: v("--color-brand-200"),
    lavenderSoft: v("--color-lavender-200"),
    gold: v("--color-accent-gold"),
  };
}
