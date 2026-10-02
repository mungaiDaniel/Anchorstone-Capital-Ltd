"use client";

import { m } from "motion/react";

/** Horizontal line that draws itself left-to-right when scrolled into view. */
export function DrawLine({ className = "", delay = 0.2 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden="true"
      className={`block origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}
