"use client";

import { m, useScroll, useSpring } from "motion/react";
import { spring } from "@/lib/motion";

/** Thin brand bar at the very top showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring.progress);
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-linear-to-r from-brand via-soft to-tint-2"
      style={{ scaleX }}
    />
  );
}
