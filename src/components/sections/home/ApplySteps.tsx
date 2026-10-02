import { site, applyLink } from "@/lib/site";
import { applySteps as steps } from "@/content/steps";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";


export function ApplySteps() {
  return (
    <section
      id="how-to-apply"
      aria-labelledby="how-to-apply-title"
      className="scroll-mt-20 bg-lavender-50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="how-to-apply-title"
          eyebrow="How it works"
          title={`Here’s how to apply for a loan at ${site.name}`}
          align="center"
        />

        <div className="relative mt-14 sm:mt-20">
          {/* Connector line behind the step numbers (desktop) */}
          <div className="absolute inset-x-[16.6%] top-10 hidden md:block">
            <DrawLine className="h-px w-full bg-linear-to-r from-brand-300 via-brand-500 to-brand-300" />
          </div>

          <StaggerGroup as="ol" className="relative grid gap-6 md:grid-cols-3 md:gap-8">
            {steps.map((text, i) => (
              <StaggerItem
                as="li"
                key={text}
                className="group relative flex flex-col items-center rounded-3xl border border-line bg-white px-7 pt-0 pb-9 text-center shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift md:border-transparent md:bg-transparent md:shadow-none md:hover:border-line md:hover:bg-white md:hover:shadow-lift"
              >
                <span
                  className="flex size-20 items-center justify-center rounded-full bg-brand-700 font-mono text-2xl font-semibold text-white shadow-lift ring-8 ring-lavender-50 transition-transform duration-500 ease-out-expo group-hover:scale-105 max-md:mt-8"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow mt-6 text-brand-600">Step {i + 1}</p>
                <p className="mt-3 max-w-xs text-lg leading-relaxed text-ink-700">{text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className="mt-12 flex justify-center sm:mt-16">
          <ButtonLink href={applyLink.href} size="lg" arrow>
            Apply Now
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
