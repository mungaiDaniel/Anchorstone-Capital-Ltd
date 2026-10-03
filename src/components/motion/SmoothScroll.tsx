"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { MOTION_INTENSITY } from "@/lib/motion";

/**
 * Lenis smooth scrolling, site-wide. Not started at all when the user prefers reduced
 * motion or MOTION_INTENSITY is 0. Renders nothing (it never wraps the page tree).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (MOTION_INTENSITY === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
