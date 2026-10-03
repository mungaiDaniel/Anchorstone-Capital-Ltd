"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global client providers:
 * - LazyMotion: components use the slim `m.*` API; only DOM animation features ship (strict mode errors on `motion.*`)
 * - MotionConfig so every Motion animation honours prefers-reduced-motion
 * Smooth scrolling lives in <SmoothScroll /> (it never wraps the tree, so nothing remounts).
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
