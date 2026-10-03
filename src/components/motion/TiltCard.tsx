"use client";

import { m, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { effect, spring } from "@/lib/motion";
import { usePointerEffects } from "./usePointerEffects";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Show the soft light highlight that follows the cursor. */
  glare?: boolean;
  /** Multiplier on the max tilt (token `effect.tiltDeg`). */
  strength?: number;
};

/** Card that tilts in 3D toward the cursor with a moving light highlight (desktop only). */
export function TiltCard({ children, className = "", glare = true, strength = 1 }: TiltCardProps) {
  const enabled = usePointerEffects();
  const rx = useSpring(useMotionValue(0), spring.soft);
  const ry = useSpring(useMotionValue(0), spring.soft);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const glow = useSpring(useMotionValue(0), spring.soft);
  const highlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgb(255 255 255 / 0.22), transparent 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = effect.tiltDeg * strength;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    mx.set(px * 100);
    my.set(py * 100);
    glow.set(1);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    glow.set(0);
  };

  return (
    <div className="h-full [perspective:1000px]">
      <m.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={enabled ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined}
        className={`relative h-full ${className}`}
      >
        {children}
        {glare && enabled && (
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: highlight, opacity: glow }}
          />
        )}
      </m.div>
    </div>
  );
}
