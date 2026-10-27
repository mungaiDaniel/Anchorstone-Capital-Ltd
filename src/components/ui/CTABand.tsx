import type { ReactNode } from "react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { Watermark } from "@/components/ui/Watermark";
import { Reveal } from "@/components/motion/Reveal";
import { ApplyButton } from "@/components/modal/ApplyButton";

/** Closing navy call-to-action band. Primary action opens the loan modal. */
export function CTABand({
  eyebrow = siteConfig.closingTagline,
  title = "Ready to move your plans forward?",
  description,
  secondary = { label: "Talk to us", href: "/contact-us" },
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-paper pb-20 sm:pb-28">
      <Container>
        <Reveal className="on-dark relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-navy to-brand px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <AuroraBackground className="-z-10 opacity-60" />
          <NoiseOverlay className="-z-10" />
          <Watermark className="-top-16 right-1/2 translate-x-1/2" />
          <Eyebrow tone="dark" className="justify-center">
            {eyebrow}
          </Eyebrow>
          <h2 id="cta-title" className="mx-auto mt-4 max-w-2xl text-3xl !text-white sm:text-5xl">
            {title}
          </h2>
          {description && <p className="mx-auto mt-5 max-w-xl text-lg text-on-navy">{description}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ApplyButton variant="light" size="lg" arrow>
              Apply for a Loan
            </ApplyButton>
            {secondary && (
              <ButtonLink href={secondary.href} variant="ghost-light" size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
