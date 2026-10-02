"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type AnimatedNumberProps = {
  value: number;
  format: (n: number) => string;
  className?: string;
};

/** Number that tweens smoothly from its previous value whenever `value` changes. */
export function AnimatedNumber({ value, format, className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const from = previous.current;
    previous.current = value;
    if (!el) return;
    if (reduceMotion || from === value) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(from, value, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => controls.stop();
  }, [value, format, reduceMotion]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {format(value)}
    </span>
  );
}
