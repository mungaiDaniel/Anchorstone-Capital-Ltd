import { steps } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export function HowToApply() {
  return (
    <section aria-labelledby="how-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading id="how-title" eyebrow="How to apply" title="Three simple steps" align="center" />
        <StaggerGroup as="ol" className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Connecting line behind the numbers (desktop) */}
          <span
            aria-hidden="true"
            className="absolute top-7 right-[16.6%] left-[16.6%] hidden h-px bg-linear-to-r from-tint-2 via-brand/40 to-tint-2 md:block"
          />
          {steps.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="relative text-center">
              <span
                aria-hidden="true"
                className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-brand font-heading text-2xl text-white shadow-soft"
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-body">{step.text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
