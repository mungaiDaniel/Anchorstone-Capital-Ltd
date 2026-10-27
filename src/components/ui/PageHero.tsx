import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Watermark } from "@/components/ui/Watermark";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { Reveal } from "@/components/motion/Reveal";

/** Navy band with monogram watermark and diagonal edge, used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  children,
  aside,
  fill = "var(--color-paper)",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Trail after "Home"; the last item is the current page. */
  breadcrumb?: { label: string; href?: string }[];
  /** Buttons / pills under the intro. */
  children?: ReactNode;
  /** Shown on the right on large screens (e.g. a large icon). */
  aside?: ReactNode;
  /** Colour of the section after the diagonal edge. */
  fill?: string;
}) {
  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-linear-to-br from-navy via-navy to-brand text-white">
        <Watermark className="-top-10 -right-10 lg:right-10" />
        <Container className="relative z-10 flex items-center justify-between gap-10 pt-14 pb-28 sm:pt-20 sm:pb-36 lg:pb-40">
          <Reveal trigger="load" className="max-w-3xl">
            {breadcrumb && (
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-xs text-on-navy">
                  <li>
                    <Link href="/" className="hover:text-white">
                      Home
                    </Link>
                  </li>
                  {breadcrumb.map((b, i) => (
                    <li key={b.label} className="flex items-center gap-2">
                      <span aria-hidden="true">/</span>
                      {b.href && i < breadcrumb.length - 1 ? (
                        <Link href={b.href} className="hover:text-white">
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
            )}
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.1] !text-white sm:text-5xl lg:text-6xl">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-navy">{intro}</p>}
            {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
          </Reveal>
          {aside && <div className="hidden shrink-0 lg:block">{aside}</div>}
        </Container>
        <DiagonalDivider fill={fill} />
      </section>
      {/* Breathing room between the diagonal edge and the first content block */}
      <div aria-hidden="true" className="h-6 sm:h-10" style={{ background: fill }} />
    </>
  );
}
