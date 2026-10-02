import type { ComponentType, SVGProps } from "react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BoltIcon, EyeIcon, HeadsetIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

// TODO(content): the original site shows titles only — add a one-line description
// per reason if the client supplies them.
const reasons: { title: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { title: "Fast disbursement", Icon: BoltIcon },
  { title: "Transparent terms", Icon: EyeIcon },
  { title: "Ethical lending", Icon: ShieldCheckIcon },
  { title: "Personalized support", Icon: HeadsetIcon },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-choose-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="why-choose-title"
          eyebrow="Why us"
          title={`Why choose ${site.name}?`}
          align="center"
        />

        <StaggerGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ title, Icon }, i) => (
            <StaggerItem
              as="li"
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-line bg-linear-to-b from-lavender-50 to-white p-8 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="absolute -top-12 -right-12 size-32 rounded-full bg-brand-100/60 transition-transform duration-700 ease-out-expo group-hover:scale-150"
              />
              <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-soft transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="size-7" />
              </span>
              <p aria-hidden="true" className="relative mt-8 font-mono text-xs text-ink-500">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="relative mt-2 text-xl font-semibold">{title}</h3>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
