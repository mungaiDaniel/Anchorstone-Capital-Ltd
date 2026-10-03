"use client";

import { useReducedMotion } from "motion/react";
import { FINE_POINTER_QUERY, MOTION_INTENSITY } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** true on desktop (mouse/trackpad) when motion is allowed — gate for cursor-driven effects. */
export function usePointerEffects() {
  const reduce = useReducedMotion();
  const fine = useMediaQuery(FINE_POINTER_QUERY);
  return fine && !reduce && MOTION_INTENSITY > 0;
}
