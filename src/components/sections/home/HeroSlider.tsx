"use client";

import Image from "next/image";
import {
  AnimatePresence,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { loanProducts, maxLoanAmount } from "@/content/loans";
import { applyLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";

const SLIDE_MS = 7000;
const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function HeroSlider() {
  const slides = loanProducts;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduceMotion = useReducedMotion();
  const autoplay = !reduceMotion && !paused && !interacting;

  // Advance on a timer; restarting the timer whenever the slide or state changes.
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, index, slides.length]);

  // Layered parallax: the photo drifts slower than the copy as the hero scrolls away.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const slide = slides[index];

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Loan offers"
      className="relative isolate overflow-hidden bg-brand-950 text-white"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteracting(false);
      }}
    >
      {/* Background photos — stacked and cross-faded so switching never flashes */}
      <m.div className="absolute inset-0 -z-20" style={reduceMotion ? undefined : { y: bgY }}>
        {slides.map((s, i) => {
          const active = i === index;
          return (
            // Plain CSS crossfade + slow "Ken Burns" zoom: compositor-only, no JS per frame.
            <div
              key={s.slug}
              className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!active}
            >
              <Image
                src={s.hero.image.src}
                alt={s.hero.image.alt}
                fill
                priority={i === 0}
                quality={85}
                // On portrait screens the hero is taller than wide, so the 3:2 photo is sized by height.
                sizes="(orientation: portrait) 105vh, 100vw"
                className={`object-cover object-center ${active ? "animate-ken-burns" : ""}`}
              />
            </div>
          );
        })}
      </m.div>

      {/* Legibility overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand-950/90 via-brand-950/55 to-transparent max-lg:via-brand-950/70"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-brand-950/80 to-transparent" />

      <Container className="flex min-h-[36rem] flex-col justify-center pt-20 pb-40 sm:min-h-[40rem] lg:min-h-[calc(100svh-5rem)] lg:pb-44">
        <m.div style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }} className="max-w-2xl">
          <h1 className="eyebrow flex items-center gap-3 text-brand-100">
            <span aria-hidden="true" className="h-px w-8 bg-accent-gold" />
            Affordable loans &amp; fast credit solutions in Kenya
          </h1>

          <div aria-live={autoplay ? "off" : "polite"} className="mt-6 min-h-[9.5rem] sm:min-h-[11.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={slide.slug}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } },
                  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
                }}
              >
                <m.p variants={line} className="font-mono text-lg text-brand-200 sm:text-xl">
                  Get up to
                </m.p>
                <m.p
                  variants={line}
                  className="mt-1 font-mono text-5xl font-semibold tracking-tight text-white sm:text-7xl"
                >
                  KES {maxLoanAmount.toLocaleString("en-KE")}
                </m.p>
                <m.p variants={line} className="mt-3 font-mono text-2xl text-white/90 sm:text-3xl">
                  {slide.hero.headline}
                </m.p>
              </m.div>
            </AnimatePresence>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {["No collateral required", slide.hero.speed].map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm"
              >
                <CheckIcon className="size-4 text-accent-gold" />
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={applyLink.href} variant="light" size="lg" arrow>
              Apply Now
            </ButtonLink>
            <a
              href="#how-to-apply"
              className="inline-flex h-13 items-center rounded-full px-5 font-mono text-[0.95rem] text-white/90 underline-offset-4 transition hover:text-white hover:underline"
            >
              How it works
            </a>
          </div>
        </m.div>
      </Container>

      {/* Slide controls */}
      <div className="absolute inset-x-0 bottom-0">
        <Container className="flex items-end gap-3 pb-6 sm:pb-8">
          <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-4">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={active ? "true" : undefined}
                  className="group text-left"
                >
                  <span
                    className={`hidden font-mono text-xs uppercase tracking-[0.14em] transition-colors sm:block ${
                      active ? "text-white" : "text-white/55 group-hover:text-white/80"
                    }`}
                  >
                    <span className="mr-2 text-accent-gold">0{i + 1}</span>
                    {s.label}
                  </span>
                  <span className="sr-only sm:hidden">{s.label}</span>
                  <span className="mt-3 block h-0.5 overflow-hidden rounded-full bg-white/20">
                    {active && (
                      <m.span
                        key={`${index}-${autoplay}`}
                        className="block h-full origin-left bg-white"
                        initial={{ scaleX: autoplay ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: autoplay ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="-mb-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {paused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
            </button>
          )}
        </Container>
      </div>
    </section>
  );
}
