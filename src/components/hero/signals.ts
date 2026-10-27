/**
 * Mutable per-frame inputs shared between the hero's DOM and its WebGL scene.
 * Written by event listeners, read inside useFrame — no React re-renders involved.
 */
export const heroSignals = {
  /** Pointer position, -1..1 on both axes (0,0 = centre). Smoothed in the scene. */
  pointerX: 0,
  pointerY: 0,
  /** 0 at the top of the hero → 1 once it has scrolled fully out of view. */
  scroll: 0,
  /** Touch devices auto-drift instead of following a pointer. */
  autoDrift: false,
};

/** Subscribes pointer + scroll listeners for `hero`. Returns a cleanup function. */
export function trackHeroSignals(hero: HTMLElement) {
  heroSignals.autoDrift = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    heroSignals.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    heroSignals.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    const h = hero.offsetHeight || 1;
    heroSignals.scroll = Math.min(1, Math.max(0, window.scrollY / h));
  };

  onScroll();
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
  };
}
