"use client";

import { m } from "motion/react";
import { useEffect, type ReactNode } from "react";

// The first page load renders without the fade, so content (and LCP) is visible
// straight from the server HTML. Later client-side navigations get the soft entrance.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const animateIn = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <m.div
      initial={animateIn ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
