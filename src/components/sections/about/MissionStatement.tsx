"use client";

import { m } from "motion/react";
import { mission } from "@/content/about";
import { Container } from "@/components/ui/Container";

const words = mission.split(" ");

/** Large mission statement that reveals word by word as it scrolls into view. */
export function MissionStatement() {
  return (
    <section
      aria-labelledby="mission-title"
      className="relative isolate overflow-hidden bg-linear-to-br from-brand-950 via-brand-900 to-brand-700 py-24 text-white sm:py-32"
    >
      <div aria-hidden="true" className="absolute -top-40 -right-40 -z-10 size-[32rem] rounded-full bg-brand-500/30 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-32 -z-10 size-[28rem] rounded-full bg-brand-600/30 blur-3xl" />

      <Container className="max-w-5xl">
        <h2 id="mission-title" className="eyebrow flex items-center gap-3 text-brand-200">
          <span aria-hidden="true" className="h-px w-8 bg-accent-gold" />
          Our Mission
        </h2>
        <m.p
          className="mt-8 font-mono text-2xl leading-snug font-medium tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
        >
          {words.map((word, i) => (
            <m.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0.15, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
              {i < words.length - 1 && " "}
            </m.span>
          ))}
        </m.p>
      </Container>
    </section>
  );
}
