import type { ProcessStep } from "@/content/site";
import { DrawLine } from "@/components/motion/DrawLine";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

/**
 * Numbered process steps: horizontal on desktop (with a connector line that draws itself in),
 * vertical cards on mobile. Same motion as the original "how to apply" section.
 */
export function Steps({ steps, tone = "light" }: { steps: ProcessStep[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const cols = steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4";
  const inset = steps.length === 3 ? "inset-x-[16.6%]" : "lg:inset-x-[12.5%]";
  return (
    <div className="relative">
      {/* Connector line behind the step numbers (desktop) */}
      <div aria-hidden="true" className={`absolute top-10 hidden ${inset} ${steps.length === 3 ? "md:block" : "lg:block"}`}>
        <DrawLine className="h-px w-full bg-linear-to-r from-brand-300 via-brand-500 to-brand-300" />
      </div>

      <StaggerGroup as="ol" className={`relative grid gap-6 ${cols} md:gap-8`}>
        {steps.map((s, i) => (
          <StaggerItem
            as="li"
            key={s.title}
            className={`group relative flex flex-col items-center rounded-3xl border px-7 pt-0 pb-9 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1.5 ${
              dark
                ? "border-white/10 bg-white/5 hover:border-white/25"
                : "border-line bg-white shadow-soft hover:border-brand-200 hover:shadow-lift md:border-transparent md:bg-transparent md:shadow-none md:hover:border-line md:hover:bg-white md:hover:shadow-lift"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex size-20 items-center justify-center rounded-full font-heading text-3xl shadow-lift ring-8 transition-transform duration-500 ease-out-expo group-hover:scale-105 max-md:mt-8 ${
                dark ? "bg-white text-navy ring-navy" : "bg-brand text-white ring-paper"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={`mt-6 text-2xl ${dark ? "!text-white" : ""}`}>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className={`mt-3 max-w-xs ${dark ? "text-on-navy" : "text-body"}`}>{s.text}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
