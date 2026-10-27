"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { duration, ease, spring } from "@/lib/motion";

type DrawLineProps = {
  className?: string;
  delay?: number;
  /** SVG path `d` in viewBox units (default viewBox 1000×120). Omit for a simple horizontal line. */
  path?: string;
  viewBox?: string;
  /** Tie drawing to scroll position (scrubs back and forth) instead of drawing once. */
  scrub?: boolean;
  /** Stroke colour class for the drawn path (the track uses the `line` token). */
  strokeClassName?: string;
  strokeWidth?: number;
};

/** A line or SVG path that draws itself — once when in view, or scrubbed with scroll. */
export function DrawLine({
  className = "",
  delay = 0.2,
  path,
  viewBox = "0 0 1000 120",
  scrub = false,
  strokeClassName = "stroke-brand-500",
  strokeWidth = 2,
}: DrawLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const progress = useSpring(scrollYProgress, spring.progress);

  const once = {
    initial: { pathLength: 0, scaleX: 0 },
    whileInView: { pathLength: 1, scaleX: 1 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: duration.slow * 1.3, delay, ease: ease.inOut },
  };

  if (!path) {
    return (
      <div ref={ref}>
        <m.span
          aria-hidden="true"
          className={`block origin-left ${className}`}
          {...(reduce ? {} : scrub ? { style: { scaleX: progress } } : once)}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox={viewBox} className="h-full w-full overflow-visible" fill="none" preserveAspectRatio="none">
        <path d={path} className="stroke-line" strokeWidth={strokeWidth} />
        <m.path
          d={path}
          className={strokeClassName}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          {...(reduce ? {} : scrub ? { style: { pathLength: progress } } : once)}
        />
      </svg>
    </div>
  );
}
