import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Watermark } from "@/components/ui/Watermark";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { Reveal } from "@/components/motion/Reveal";

/** Navy band with watermark and diagonal edge, used at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  aside,
  fill = "var(--color-paper)",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Extra content under the description (pills, buttons). */
  children?: ReactNode;
  /** Content shown on the right on large screens (e.g. a large icon). */
  aside?: ReactNode;
  /** Background colour of the section that follows the diagonal edge. */
  fill?: string;
}) {
  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-linear-to-br from-navy via-navy to-brand text-white">
        <Watermark className="-top-10 -right-10 lg:right-10" />
        <Container className="relative z-10 flex items-center justify-between gap-10 pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pb-40">
          <Reveal trigger="load" className="max-w-3xl">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.1] !text-white sm:text-5xl lg:text-6xl">{title}</h1>
            {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">{description}</p>}
            {children}
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
