"use client";

import { useEffect, useRef } from "react";
import { usePointerEffects } from "@/components/motion/usePointerEffects";

type GridGlowProps = {
  tone?: "dark" | "light";
  /** Grid cell size in px. */
  cell?: number;
  className?: string;
};

/**
 * Faint grid; a soft spotlight follows the cursor across its parent (desktop only —
 * elsewhere the glow rests in the upper right). Updates CSS variables once per frame.
 */
export function GridGlow({ tone = "dark", cell = 48, className = "" }: GridGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const follow = usePointerEffects();

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || !follow) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect();
        el.style.setProperty("--gx", `${e.clientX - r.left}px`);
        el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      });
    };
    parent.addEventListener("pointermove", onMove);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [follow]);

  const line = tone === "dark" ? "rgb(255 255 255 / 0.07)" : "color-mix(in oklab, var(--color-brand-700) 9%, transparent)";
  const lineHot = tone === "dark" ? "color-mix(in oklab, var(--color-brand-200) 45%, transparent)" : "color-mix(in oklab, var(--color-brand-500) 30%, transparent)";
  const grid = (c: string) =>
    `linear-gradient(to right, ${c} 1px, transparent 1px), linear-gradient(to bottom, ${c} 1px, transparent 1px)`;

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 [--gx:75%] [--gy:20%] ${className}`}>
      <div
        className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]"
        style={{ backgroundImage: grid(line), backgroundSize: `${cell}px ${cell}px` }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: grid(lineHot),
          backgroundSize: `${cell}px ${cell}px`,
          maskImage: "radial-gradient(260px circle at var(--gx) var(--gy), black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(260px circle at var(--gx) var(--gy), black, transparent 75%)",
        }}
      />
    </div>
  );
}
