import type { ComponentType, SVGProps } from "react";
import { coreValues } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AwardIcon, HeartIcon, ShieldCheckIcon, SproutIcon } from "@/components/ui/icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const icons: Record<(typeof coreValues)[number]["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  shield: ShieldCheckIcon,
  sprout: SproutIcon,
  award: AwardIcon,
  heart: HeartIcon,
};

export function CoreValues() {
  return (
    <section aria-labelledby="core-values-title" className="bg-lavender-50 py-20 sm:py-28">
      <Container>
        <SectionHeading id="core-values-title" eyebrow="What guides us" title="Our Core Values" align="center" />

        <StaggerGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map(({ title, text, icon }, i) => {
            const Icon = icons[icon];
            return (
              <StaggerItem
                as="li"
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-6 right-7 font-mono text-5xl font-semibold text-lavender-100 transition-colors duration-500 group-hover:text-brand-50"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-soft transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="size-7" />
                </span>
                <h3 className="relative mt-8 text-xl font-semibold">{title}</h3>
                <p className="relative mt-3 leading-relaxed">{text}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
