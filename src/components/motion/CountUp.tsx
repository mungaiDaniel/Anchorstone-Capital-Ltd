"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const format = (n: number) => Math.round(n).toLocaleString("en-KE");

/**
 * Animated number counter. Server-renders the final value (good for SEO/no-JS),
 * then counts up from zero the first time it scrolls into view.
 */
export function CountUp({ value, prefix = "", suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = `${prefix}${format(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {`${prefix}${format(value)}${suffix}`}
    </span>
  );
}
