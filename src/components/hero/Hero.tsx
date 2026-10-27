"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MOBILE_QUERY } from "./config";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { trackHeroSignals } from "./signals";

// three.js + R3F are only downloaded on the client, after the copy has rendered.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * true only for hardware-accelerated WebGL. Software renderers (SwiftShader, llvmpipe — e.g. no GPU,
 * blocklisted drivers, many VMs and lab tools) would run the 3D scene on the CPU and freeze the page,
 * so they get the static CSS fallback instead.
 */
function hasHardwareWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") ?? c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

/** Events that count as "the visitor is here" — the 3D scene loads on the first of them. */
const INTERACTION_EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;

/**
 * Calls `fn` once, on the first user interaction (then when the browser is idle).
 * Keeps the ~1 MB three.js bundle and its GPU warm-up out of the initial load entirely.
 */
function onFirstInteraction(fn: () => void) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    if ("requestIdleCallback" in window) window.requestIdleCallback(fn, { timeout: 300 });
    else setTimeout(fn, 0);
  };
  const cleanup = () => INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, run));
  INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, run, { passive: true, once: true }));
  return cleanup;
}

/**
 * Home page hero. Layers, back to front:
 *   HeroBackground (CSS, incl. a static wave/object scene) → HeroScene (WebGL: waves, objects,
 *   particles; loaded on first interaction, hardware GPUs only) → HeroContent (HTML) → curved edge.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [env, setEnv] = useState<{ webgl: boolean; mobile: boolean } | null>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const stopTracking = trackHeroSignals(hero);
    const cancel = onFirstInteraction(() =>
      setEnv({ webgl: hasHardwareWebGL(), mobile: window.matchMedia(MOBILE_QUERY).matches }),
    );
    return () => {
      stopTracking();
      cancel();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Introduction"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-brand-950 pt-32 pb-40 text-white sm:pt-36 sm:pb-48"
    >
      {/* Static scene (CSS) shows first; it cross-fades out once the WebGL scene is ready. */}
      <HeroBackground showStaticScene={!sceneReady} />

      {env?.webgl && (
        <div
          className={`absolute inset-0 -z-[5] transition-opacity duration-1000 ease-out ${sceneReady ? "opacity-100" : "opacity-0"}`}
        >
          <HeroScene
            heroRef={heroRef}
            mobile={env.mobile}
            animate={!reduceMotion}
            onReady={() => setSceneReady(true)}
          />
        </div>
      )}

      <HeroContent heroRef={heroRef} />

      {/* Soft curved hand-off into the next (light lavender) section */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 w-full fill-lavender-50 sm:h-24"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0 100V60C240 18 480 0 720 0s480 18 720 60v40Z" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-14 h-24 bg-linear-to-t from-brand-200/10 to-transparent sm:bottom-20"
      />
    </section>
  );
}
