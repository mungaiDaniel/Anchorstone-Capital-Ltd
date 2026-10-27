import type { ProcessStep } from "@/content/site";

/** Numbered process steps: horizontal on desktop, vertical on mobile. */
export function Steps({ steps, tone = "light" }: { steps: ProcessStep[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className={`relative grid gap-8 ${steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"} md:gap-6`}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 md:block md:text-center">
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute top-14 bottom-[-2rem] left-7 w-px md:top-7 md:right-[-50%] md:bottom-auto md:left-[calc(50%+2rem)] md:h-px md:w-auto ${
                dark ? "bg-white/20" : "bg-tint-2"
              }`}
            />
          )}
          <span
            aria-hidden="true"
            className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full font-heading text-2xl shadow-soft md:mx-auto ${
              dark ? "bg-white text-navy" : "bg-brand text-white"
            }`}
          >
            {i + 1}
          </span>
          <div>
            <h3 className={`text-2xl md:mt-5 ${dark ? "!text-white" : ""}`}>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className={`mt-2 md:mx-auto md:max-w-[16rem] ${dark ? "text-on-navy" : "text-body"}`}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
