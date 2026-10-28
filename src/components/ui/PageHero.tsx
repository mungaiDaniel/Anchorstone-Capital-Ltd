import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Watermark } from "@/components/ui/Watermark";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { GridGlow } from "@/components/effects/GridGlow";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { WaveRibbon } from "@/components/effects/WaveRibbon";
import { FloatingDecor } from "@/components/effects/FloatingDecor";
import { Reveal } from "@/components/motion/Reveal";
import { SitePhoto } from "@/components/ui/SitePhoto";
import type { SiteImage } from "@/content/images";
import { SplitText } from "@/components/motion/SplitText";

/**
 * Animated header for inner pages — the home hero's language at a calmer scale:
 * aurora blobs + cursor grid glow + SVG wave ribbon + grain + floating decor, split-text title.
 * Everything animates with CSS from first paint; no WebGL. Keeps the monogram watermark and diagonal edge.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  children,
  aside,
  fill = "var(--color-paper)",
  image,
}: {
  eyebrow: string;
  /** Plain text (split into words for the reveal). */
  title: string;
  intro?: ReactNode;
  /** Trail after "Home"; the last item is the current page. */
  breadcrumb?: { label: string; href?: string }[];
  /** Buttons / pills under the intro. */
  children?: ReactNode;
  /** Shown on the right on large screens (e.g. a large icon). */
  aside?: ReactNode;
  /** Colour of the section after the diagonal edge. */
  fill?: string;
  /** Slot photo shown behind the navy gradient. */
  image?: SiteImage;
}) {
  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-brand-950 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_30%_20%,var(--color-brand-800),var(--color-brand-950)_65%,var(--color-night))]"
        />
        {image && (
          <div className="absolute inset-0 -z-10">
            <SitePhoto image={image} sizes="100vw" overlay />
          </div>
        )}
        <AuroraBackground className="-z-10 opacity-70" />
        <GridGlow className="-z-10" />
        <WaveRibbon className="-bottom-6 -z-10 h-28 sm:h-36" />
        <NoiseOverlay className="-z-10" />
        <Watermark className="-top-10 -right-10 -z-10 lg:right-10" />
        <FloatingDecor kind="coin" size={64} className="top-40 right-[12%]" speed={0.5} />
        <FloatingDecor kind="glass" size={46} className="top-64 right-[24%]" speed={0.3} delay={2} />
        <FloatingDecor kind="stone" size={84} className="right-[6%] bottom-28" speed={0.7} delay={4} />

        <Container className="relative z-10 flex items-center justify-between gap-10 pt-32 pb-28 sm:pt-40 sm:pb-36 lg:pb-40">
          <div className="max-w-3xl">
            {breadcrumb && (
              <Reveal trigger="load" delay={0.05}>
                <nav aria-label="Breadcrumb" className="mb-8">
                  <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-200">
                    <li>
                      <Link href="/" className="link-draw transition hover:text-white">
                        Home
                      </Link>
                    </li>
                    {breadcrumb.map((b, i) => (
                      <li key={b.label} className="flex items-center gap-2">
                        <span aria-hidden="true">/</span>
                        {b.href && i < breadcrumb.length - 1 ? (
                          <Link href={b.href} className="link-draw transition hover:text-white">
                            {b.label}
                          </Link>
                        ) : (
                          <span aria-current="page" className="text-white">
                            {b.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            )}
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
              className="mt-6 text-4xl leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
              unitClassName="bg-linear-to-b from-white via-white to-brand-200 bg-clip-text pb-[0.08em] text-transparent"
            />
            {intro && (
              <Reveal trigger="load" delay={0.6}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100">{intro}</p>
              </Reveal>
            )}
            {children && (
              <Reveal trigger="load" delay={0.75}>
                <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>
              </Reveal>
            )}
          </div>
          {aside && <div className="hidden shrink-0 lg:block">{aside}</div>}
        </Container>
        <DiagonalDivider fill={fill} />
      </section>
      {/* Breathing room between the diagonal edge and the first content block */}
      <div aria-hidden="true" className="h-6 sm:h-10" style={{ background: fill }} />
    </>
  );
}
