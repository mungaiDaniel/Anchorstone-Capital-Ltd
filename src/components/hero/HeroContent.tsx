"use client";

import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { Fragment, type CSSProperties, type RefObject } from "react";
import { heroCopy } from "@/content/hero";
import { applyLink } from "@/lib/site";
import { effect } from "@/lib/motion";
import { ArrowRightIcon, SparkleIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";

// ─── Tweakables ──────────────────────────────────────────────────────────────
/** Entrance cascade timings (seconds). The whole sequence lands in ~1.5 s. */
const TIMING = { badge: 0.45, firstWord: 0.55, wordStep: 0.07, body: 1.0, buttons: 1.12, trust: 1.28 };
/** Marquee loop duration (seconds) — larger = slower. */
const MARQUEE_SECONDS = effect.marqueeSeconds;

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Copy layer. Server-rendered HTML with CSS-only entrance animations (`.hero-in`),
 * so it's readable immediately — no waiting for JavaScript or WebGL.
 */
export function HeroContent({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);

  let word = 0;
  return (
    <m.div style={{ opacity, y }} className="relative mx-auto flex w-full max-w-4xl min-w-0 flex-col items-center px-4 text-center">
      {/* Soft scrim keeps text contrast high over the moving background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[-10%] inset-y-[-15%] -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,color-mix(in_oklab,var(--color-brand-950)_70%,transparent),transparent_75%)]"
      />

      <p
        className="hero-in eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-brand-100 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md"
        style={delay(TIMING.badge)}
      >
        <SparkleIcon className="size-3.5 text-accent-gold" />
        {heroCopy.badge}
      </p>

      <h1 className="mt-7 text-[2.35rem] leading-[1.08] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
        {heroCopy.headline.map((line, li) => (
          <span key={line} className="block">
            {li > 0 && " "}
            {line.split(" ").map((w, wi) => {
              const d = TIMING.firstWord + word++ * TIMING.wordStep;
              return (
                <Fragment key={w}>
                  {/* Real spaces between words, so search engines and screen readers read the sentence */}
                  {wi > 0 && " "}
                  <span
                    className="hero-word inline-block bg-linear-to-b from-white via-white to-brand-200 bg-clip-text pb-[0.08em] text-transparent"
                    style={delay(d)}
                  >
                    {w}
                  </span>
                </Fragment>
              );
            })}
          </span>
        ))}
      </h1>

      <p className="hero-in mt-7 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg" style={delay(TIMING.body)}>
        {heroCopy.body}
      </p>

      <div className="hero-in mt-10 flex flex-col items-center gap-3 sm:flex-row" style={delay(TIMING.buttons)}>
        <Magnetic>
        <Link
          href={applyLink.href}
          className="group inline-flex h-14 items-center gap-3 rounded-full bg-white pr-2 pl-7 font-mono text-[0.95rem] font-medium text-brand-900 shadow-[0_10px_40px_-10px_rgb(255_255_255/0.45)] transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_14px_50px_-8px_color-mix(in_oklab,var(--color-brand-200)_80%,transparent)]"
        >
          {heroCopy.primaryCta}
          <span className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-brand-800 text-white">
            <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </span>
        </Link>
        </Magnetic>
        <a
          href="#how-to-apply"
          className="inline-flex h-14 items-center rounded-full border border-white/15 bg-white/[0.06] px-7 font-mono text-[0.95rem] font-medium text-white backdrop-blur-md transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.1] hover:shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--color-brand-300)_70%,transparent)]"
        >
          {heroCopy.secondaryCta}
        </a>
      </div>

      <div className="hero-in mt-14 w-full max-w-3xl" style={delay(TIMING.trust)}>
        <p className="font-mono text-xs tracking-[0.18em] text-brand-200 uppercase">{heroCopy.trustLabel}</p>
        <Marquee
          className="mt-4"
          seconds={MARQUEE_SECONDS}
          items={heroCopy.trustPoints.map((p) => (
            <span
              key={p}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs whitespace-nowrap text-brand-100"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-gold" />
              {p}
            </span>
          ))}
        />
      </div>
    </m.div>
  );
}
