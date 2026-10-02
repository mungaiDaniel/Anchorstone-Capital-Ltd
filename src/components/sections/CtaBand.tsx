import Image from "next/image";
import type { ReactNode } from "react";
import { applyLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

type CtaBandProps = {
  eyebrow?: string;
  title: ReactNode;
  cta?: { label: string; href: string };
  image?: { src: string; alt: string };
};

/** Closing call-to-action panel, reused across pages. */
export function CtaBand({
  eyebrow = "Get started",
  title,
  cta = { label: "Apply Now", href: applyLink.href },
  image,
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-white pb-20 sm:pb-28">
      <Container>
        <Reveal
          y={40}
          className="relative isolate grid overflow-hidden rounded-[2rem] bg-linear-to-br from-brand-900 via-brand-800 to-brand-600 shadow-lift lg:grid-cols-2"
        >
          <div
            aria-hidden="true"
            className="absolute -top-32 -left-32 -z-10 size-96 rounded-full bg-brand-500/40 blur-3xl"
          />
          <div className="px-7 py-14 sm:px-12 sm:py-16 lg:py-20">
            <p className="eyebrow flex items-center gap-3 text-brand-200">
              <span aria-hidden="true" className="h-px w-8 bg-accent-gold" />
              {eyebrow}
            </p>
            <h2 id="cta-title" className="mt-4 text-3xl leading-tight font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <ButtonLink href={cta.href} variant="light" size="lg" arrow className="mt-9">
              {cta.label}
            </ButtonLink>
          </div>
          {image && (
            <div className="relative min-h-64 lg:min-h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={85}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-b from-brand-800/60 to-transparent lg:bg-linear-to-r"
              />
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
