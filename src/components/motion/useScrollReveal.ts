"use client";

import { useEffect, type RefObject } from "react";
import { MOTION_INTENSITY, viewport } from "@/lib/motion";

/** One IntersectionObserver shared by every reveal on the page. */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: viewport.rootMargin, threshold: viewport.threshold },
  );
  return observer;
}

/**
 * Progressive scroll reveal. The server HTML is always visible; after hydration this
 * hides only elements that are still below the fold (`.reveal-pending`) and shows them
 * once (`.reveal-in`) when they scroll in. Content already on screen is left alone,
 * so nothing ever flashes and nothing depends on JS for visibility.
 *
 * `onPending` lets groups prepare children (e.g. stagger delays) before hiding.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>, onPending?: (el: HTMLElement) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el || MOTION_INTENSITY === 0) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.dataset.revealMode = "fade";
    onPending?.(el);
    el.classList.add("reveal-pending");

    const io = getObserver();
    callbacks.set(el, () => {
      el.classList.add("reveal-in");
      el.classList.remove("reveal-pending");
    });
    io.observe(el);
    return () => {
      io.unobserve(el);
      callbacks.delete(el);
      el.classList.remove("reveal-pending");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per mount
  }, []);
}
