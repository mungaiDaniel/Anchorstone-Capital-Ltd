"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { duration, ease, MOTION_INTENSITY } from "@/lib/motion";

type CountUpProps = {
  /** Use real figures from the site content only. */
  value: number;
  prefix?: string;
  suffix?: string;
  /** Seconds (default: motion token `slow` × 1.5). */
  duration?: number;
  className?: string;
};

const format = (n: number) => Math.round(n).toLocaleString("en-KE");

/**
 * Animated number. Server-renders the final value (SEO / no-JS), then counts up from
 * zero the first time it scrolls into view.
 */
export function CountUp({ value, prefix = "", suffix = "", duration: seconds = duration.slow * 1.5, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduceMotion || MOTION_INTENSITY === 0) return;
    const controls = animate(0, value, {
      duration: seconds,
      ease: ease.out,
      onUpdate: (v) => (el.textContent = `${prefix}${format(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, prefix, suffix, seconds]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {`${prefix}${format(value)}${suffix}`}
    </span>
  );
}
