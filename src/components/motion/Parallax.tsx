"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { distance, MOBILE_FACTOR } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

type ParallaxProps = {
  children: ReactNode;
  /** Relative speed: 0.5 = gentle, 1 = strong, negative = moves the other way. */
  speed?: number;
  className?: string;
};

/** Moves its content at a different speed while it scrolls through the viewport. */
export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const factor = useMediaQuery("(max-width: 767px)") ? MOBILE_FACTOR : 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = distance.parallax * speed * factor;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y }} className="h-full w-full will-change-transform">
        {children}
      </m.div>
    </div>
  );
}
