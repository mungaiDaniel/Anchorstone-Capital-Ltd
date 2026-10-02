import Image from "next/image";
import type { LoanProduct } from "@/content/loans";
import { applyLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, DocumentIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

type Props = {
  product: LoanProduct;
  index: number;
  /** Image on the right instead of the left (desktop). */
  reverse?: boolean;
  tone?: "white" | "lavender";
};

export function LoanProductSection({ product, index, reverse = false, tone = "white" }: Props) {
  const titleId = `${product.slug}-loans-title`;
  const cardBg = tone === "lavender" ? "bg-white" : "bg-lavender-50";

  return (
    <section
      id={`${product.slug}-loans`}
      aria-labelledby={titleId}
      className={`scroll-mt-20 overflow-hidden py-20 sm:py-28 ${tone === "lavender" ? "bg-lavender-50" : "bg-white"}`}
    >
      <Container className="grid items-center gap-20 lg:grid-cols-2 lg:gap-20">
        {/* Media */}
        <Reveal className={`relative ${reverse ? "lg:order-2" : ""}`} y={40}>
          <div
            aria-hidden="true"
            className={`absolute -inset-3 -z-0 rounded-[2.25rem] bg-linear-to-br from-brand-100 to-lavender-100 sm:-inset-5 ${
              reverse ? "-rotate-2" : "rotate-2"
            }`}
          />
          <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              quality={85}
              // Landscape (3:2) photos fill taller frames (4:3 → 5:4 → 4:5), so request
              // enough width that the crop is never upscaled: frame width × (1.5 / frame ratio).
              sizes="(min-width: 1280px) 1050px, (min-width: 1024px) 85vw, (min-width: 640px) 120vw, 115vw"
              style={{ objectPosition: product.image.position ?? "center" }}
              className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            />
          </div>

          {/* Floating stat card */}
          <div
            className={`absolute -bottom-8 flex divide-x divide-line rounded-2xl border border-line bg-white/95 shadow-lift backdrop-blur ${
              reverse ? "right-4 sm:right-8" : "left-4 sm:left-8"
            }`}
          >
            {product.highlights.map((h) => (
              <div key={h.label} className="px-4 py-3.5 whitespace-nowrap sm:px-6 sm:py-4">
                <p className="eyebrow text-[0.65rem] text-ink-500">{h.label}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-brand-700 sm:text-2xl">
                  <CountUp value={h.value} prefix={h.prefix} suffix={h.suffix} />
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Copy */}
        <div className={reverse ? "lg:order-1" : ""}>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brand-600">
              <span className="text-accent-orange">{String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className="h-px w-8 bg-brand-300" />
              {product.label}
            </p>
            <h2 id={titleId} className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              {product.title}
            </h2>
            <h3 className="mt-3 font-mono text-lg font-medium text-brand-600 sm:text-xl">{product.subtitle}</h3>
            <p className="mt-5 text-lg leading-relaxed">{product.description}</p>
          </Reveal>

          <StaggerGroup className={`mt-8 grid gap-4 ${product.requirements ? "sm:grid-cols-2" : ""}`}>
            <StaggerItem className={`rounded-2xl border border-line p-6 ${cardBg}`}>
              <h4 className="eyebrow text-brand-700">{product.featuresHeading}</h4>
              <ul className="mt-4 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.95rem] leading-snug text-ink-700">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                      <CheckIcon className="size-3" strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </StaggerItem>

            {product.requirements && (
              <StaggerItem className={`rounded-2xl border border-line p-6 ${cardBg}`}>
                <h4 className="eyebrow text-brand-700">Requirements</h4>
                <ul className="mt-4 space-y-3">
                  {product.requirements.map((r) => (
                    <li key={r} className="flex gap-3 text-[0.95rem] leading-snug text-ink-700">
                      <DocumentIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
                      {r}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            )}
          </StaggerGroup>

          {product.note && (
            <Reveal>
              <p className="mt-8 border-l-2 border-accent-orange pl-5 text-lg leading-relaxed text-ink-700 italic">
                {product.note}
              </p>
            </Reveal>
          )}

          <Reveal className="mt-9">
            <ButtonLink href={applyLink.href} arrow>
              Apply Now
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
