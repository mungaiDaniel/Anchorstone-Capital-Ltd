"use client";

import { ReactLenis } from "lenis/react";
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global client providers:
 * - Lenis smooth scrolling (skipped entirely when the user prefers reduced motion)
 * - LazyMotion: components use the slim `m.*` API; only DOM animation features ship (strict mode errors on `motion.*`)
 * - MotionConfig so every Motion animation honours prefers-reduced-motion
 */
export function Providers({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {reduceMotion ? (
          children
        ) : (
          <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
            {children}
          </ReactLenis>
        )}
      </MotionConfig>
    </LazyMotion>
  );
}
