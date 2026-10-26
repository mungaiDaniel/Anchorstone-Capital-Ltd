import type { ReactNode } from "react";
import { applyLink } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Watermark } from "@/components/ui/Watermark";
import { Reveal } from "@/components/motion/Reveal";

type Action = { label: string; href: string };

/** Closing navy call-to-action. */
export function CtaBand({
  eyebrow = "Get started",
  title = "Ready to take the next step?",
  description,
  primary = { label: "Apply for a Loan", href: applyLink.href },
  secondary = { label: "Contact us", href: "/contact-us" },
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  primary?: Action;
  secondary?: Action | null;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-paper pb-20 sm:pb-28">
      <Container>
        <Reveal className="on-dark relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-navy to-brand px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <Watermark className="-top-16 right-1/2 translate-x-1/2" />
          <Eyebrow tone="dark" className="justify-center">{eyebrow}</Eyebrow>
          <h2 id="cta-title" className="mx-auto mt-4 max-w-2xl text-3xl !text-white sm:text-5xl">
            {title}
          </h2>
          {description && <p className="mx-auto mt-5 max-w-xl text-lg text-soft">{description}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href} variant="light" size="lg" arrow>
              {primary.label}
            </ButtonLink>
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
