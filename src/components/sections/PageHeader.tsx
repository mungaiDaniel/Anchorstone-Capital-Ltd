import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { GridGlow } from "@/components/effects/GridGlow";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { WaveRibbon } from "@/components/effects/WaveRibbon";
import { FloatingDecor } from "@/components/effects/FloatingDecor";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

type PageHeaderProps = {
  eyebrow: string;
  /** Title text (split into words for the reveal). */
  title: string;
  description?: ReactNode;
  breadcrumb: { label: string; href?: string }[];
  /** Show the coin / glass / stone decor at the edges. */
  decor?: boolean;
  /** Extra bottom space when cards overlap the header's lower edge. */
  overlapBelow?: boolean;
};

/**
 * Compact animated header for inner pages — the hero's language at a smaller, calmer scale:
 * aurora blobs + cursor grid glow + SVG wave ribbon + grain, split-text title, curved edge.
 * Everything animates with CSS from first paint; no WebGL.
 */
export function PageHeader({ eyebrow, title, description, breadcrumb, decor = true, overlapBelow = false }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_30%_20%,var(--color-brand-800),var(--color-brand-950)_65%,var(--color-night))]" />
      <AuroraBackground className="-z-10 opacity-70" />
      <GridGlow className="-z-10" />
      <WaveRibbon className="-bottom-6 -z-10 h-28 sm:h-36" />
      <NoiseOverlay className="-z-10" />
      {decor && (
        <>
          <FloatingDecor kind="coin" size={64} className="top-36 right-[12%]" speed={0.5} />
          <FloatingDecor kind="glass" size={46} className="top-60 right-[24%]" speed={0.3} delay={2} />
          <FloatingDecor kind="stone" size={84} className="right-[6%] bottom-24" speed={0.7} delay={4} />
        </>
      )}

      <Container className={`pt-36 sm:pt-44 ${overlapBelow ? "pb-36 sm:pb-44" : "pb-24 sm:pb-32"}`}>
        <Reveal trigger="load" as="div" delay={0.05}>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-mono text-xs text-brand-200">
              <li>
                <Link href="/" className="link-draw transition hover:text-white">Home</Link>
              </li>
              {breadcrumb.map((item, i) => {
                const current = i === breadcrumb.length - 1;
                return (
                  <li key={item.label} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    {item.href && !current ? (
                      <Link href={item.href} className="link-draw transition hover:text-white">{item.label}</Link>
                    ) : (
                      <span aria-current={current ? "page" : undefined} className="text-white">{item.label}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <Reveal trigger="load" delay={0.15}>
            <p className="eyebrow inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-brand-100 backdrop-blur-md">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-gold" />
              {eyebrow}
            </p>
          </Reveal>
          <SplitText
            as="h1"
            text={title}
            trigger="load"
            delay={0.25}
            className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl"
            unitClassName="bg-linear-to-b from-white via-white to-brand-200 bg-clip-text pb-[0.08em] text-transparent"
          />
          {description && (
            <Reveal trigger="load" delay={0.6}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">{description}</p>
            </Reveal>
          )}
        </div>
      </Container>

      {/* Curved hand-off into the light page below */}
      <svg aria-hidden="true" className="absolute inset-x-0 bottom-0 h-10 w-full fill-lavender-50 sm:h-16" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0 100V60C240 18 480 0 720 0s480 18 720 60v40Z" />
      </svg>
    </section>
  );
}
