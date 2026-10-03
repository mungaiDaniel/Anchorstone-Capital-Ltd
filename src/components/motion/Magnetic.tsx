"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { distance, spring } from "@/lib/motion";
import { usePointerEffects } from "./usePointerEffects";

type MagneticProps = {
  children: ReactNode;
  /** Multiplier on the max follow distance (token `distance.magnetic`). */
  strength?: number;
  className?: string;
};

/** The wrapped element drifts a few px toward the cursor (desktop only), then springs back. */
export function Magnetic({ children, strength = 1, className = "" }: MagneticProps) {
  const enabled = usePointerEffects();
  const x = useSpring(useMotionValue(0), spring.snappy);
  const y = useSpring(useMotionValue(0), spring.snappy);

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const max = distance.magnetic * strength;
    x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      className={`inline-block ${className}`}
      style={enabled ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  );
}
