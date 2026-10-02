import Image from "next/image";
import { aboutClosing, aboutIntro, directorsExperienceYears } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

export function AboutStory() {
  return (
    <section aria-labelledby="who-we-are-title" className="overflow-hidden bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-20 lg:grid-cols-2 lg:gap-20">
        {/* Media + experience stat */}
        <Reveal className="relative" y={40}>
          <div
            aria-hidden="true"
            className="absolute -inset-3 rotate-2 rounded-[2.25rem] bg-linear-to-br from-brand-100 to-lavender-100 sm:-inset-5"
          />
          <div className="group relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift lg:aspect-[4/5]">
            <Image
              src="/images/about-team-professionals-laptop.webp"
              alt="Three young professionals discussing work around a laptop"
              fill
              quality={85}
              sizes="(min-width: 1280px) 1050px, (min-width: 1024px) 85vw, 115vw"
              className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
            />
          </div>
          <div className="absolute right-3 -bottom-12 max-w-[12.5rem] rounded-2xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur sm:right-6 sm:max-w-[15rem] sm:p-6">
            <p className="font-mono text-4xl font-semibold text-brand-700 sm:text-5xl">
              <CountUp value={directorsExperienceYears} />
            </p>
            <p className="mt-2 text-xs leading-snug text-ink-700 sm:text-sm">
              Years of combined experience our directors bring in banking, credit management and micro-lending
            </p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brand-600">
              <span aria-hidden="true" className="h-px w-8 bg-brand-300" />
              Our story
            </p>
            <h2 id="who-we-are-title" className="mt-4 text-3xl leading-tight font-semibold sm:text-4xl">
              Who we are
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 text-lg leading-relaxed">
            {aboutIntro.map((p) => (
              <Reveal key={p}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <blockquote className="relative mt-10 rounded-2xl bg-lavender-50 p-6 pl-8 sm:p-8 sm:pl-10">
              <span aria-hidden="true" className="absolute top-6 bottom-6 left-0 w-1 rounded-full bg-accent-gold" />
              <p className="font-mono text-xl leading-snug font-medium text-brand-800 sm:text-2xl">
                {aboutClosing.quote}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
