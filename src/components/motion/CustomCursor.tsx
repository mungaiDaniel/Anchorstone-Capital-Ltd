"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { spring } from "@/lib/motion";
import { usePointerEffects } from "./usePointerEffects";

const INTERACTIVE = "a, button, [role='button'], input, select, textarea, label, [data-cursor]";

/**
 * Subtle ring that trails the native cursor and grows over links/buttons (desktop only).
 * The native cursor stays visible; the ring uses `difference` blending so it reads on
 * both the dark hero and light sections.
 */
export function CustomCursor() {
  const enabled = usePointerEffects();
  const x = useSpring(useMotionValue(-100), spring.snappy);
  const y = useSpring(useMotionValue(-100), spring.snappy);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHover(Boolean((e.target as Element | null)?.closest?.(INTERACTIVE)));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-difference"
      style={{ x, y }}
    >
      <m.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        animate={{ width: hover ? 48 : 26, height: hover ? 48 : 26, opacity: visible ? (hover ? 0.9 : 0.55) : 0 }}
        transition={{ type: "spring", ...spring.snappy }}
      />
    </m.div>
  );
}
