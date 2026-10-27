"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { distance, duration, ease } from "@/lib/motion";

// The first page load renders without any transition (content and LCP visible straight
// from the server HTML). Later client-side navigations get the wipe + soft entrance.
let hasNavigated = false;

/**
 * Route transition, used by app/template.tsx (which remounts on every navigation):
 * a navy panel wipes up off the screen while the new page fades and rises in.
 * Reduced motion: a quick fade only.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const animateIn = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animateIn && !reduce && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] origin-top bg-linear-to-b from-brand-950 to-brand-800"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: duration.page, ease: ease.inOut }}
        />
      )}
      <m.div
        initial={animateIn ? { opacity: 0, y: reduce ? 0 : distance.reveal * 0.5 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? duration.fast : duration.base, delay: animateIn && !reduce ? duration.page * 0.45 : 0, ease: ease.out }}
      >
        {children}
      </m.div>
    </>
  );
}
