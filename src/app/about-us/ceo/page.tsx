import type { Metadata } from "next";
import Image from "next/image";
import { ceo, siteConfig } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutShell } from "@/components/about/AboutShell";

export const metadata: Metadata = pageMetadata({
  title: `Meet Our CEO — ${ceo.name}`,
  description: `${ceo.name}, ${ceo.role} of ${siteConfig.shortName}: over 13 years in banking, lending and corporate leadership.`,
  path: "/about-us/ceo",
});

export default function CeoPage() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ceo.name,
    jobTitle: ceo.role,
    image: absoluteUrl(ceo.photo.src),
    description: ceo.summary,
    url: absoluteUrl("/about-us/ceo"),
    worksFor: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <JsonLd
        data={[
          person,
          breadcrumbJsonLd([
            { name: "About Us", path: "/about-us" },
            { name: "Meet Our CEO", path: "/about-us/ceo" },
          ]),
        ]}
      />
      <AboutShell current="/about-us/ceo" eyebrow="Leadership" title="Meet Our CEO" breadcrumbLabel="Meet Our CEO">
        <section aria-labelledby="ceo-name" className="bg-paper py-16 sm:py-20">
          <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-tint shadow-lift">
              <Image
                src={ceo.photo.src}
                alt={ceo.photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: ceo.photo.position }}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Eyebrow>{ceo.role}</Eyebrow>
              <h2 id="ceo-name" className="mt-4 text-4xl sm:text-5xl">
                {ceo.name}
              </h2>
              <p className="mt-6 text-lg leading-relaxed">{ceo.summary}</p>
              <ButtonLink href="/about-us/team" variant="link-arrow" arrow className="mt-6">
                Meet the team
              </ButtonLink>
            </Reveal>
          </Container>
        </section>

        <section aria-label="Career and education" className="bg-paper pb-16 sm:pb-24">
          <Container className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            {ceo.highlights && (
              <Reveal>
                <h2 className="text-3xl">Career highlights</h2>
                <ol className="relative mt-8 space-y-8 border-l border-line pl-8">
                  {ceo.highlights.map((h) => (
                    <li key={`${h.org}-${h.title}`} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute top-1.5 -left-[2.4rem] size-3 rounded-full border-2 ${
                          h.current ? "border-brand bg-brand" : "border-brand/40 bg-white"
                        }`}
                      />
                      <p className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-ink">{h.title}</span>
                        {h.current && <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">Current</span>}
                      </p>
                      <p className="text-sm font-semibold text-brand">{h.org}</p>
                      <p className="mt-1 text-body">{h.detail}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
            <div className="space-y-10">
              {ceo.education && (
                <Reveal>
                  <h2 className="text-3xl">Education</h2>
                  <ul className="mt-5 space-y-3">
                    {ceo.education.map((e) => (
                      <li key={e} className="rounded-xl bg-tint px-4 py-3 text-ink">
                        {e}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {ceo.quote && (
                <Reveal>
                  <blockquote className="rounded-2xl border-l-4 border-brand bg-white p-6 shadow-soft">
                    <p className="font-heading text-2xl leading-snug text-ink">&ldquo;{ceo.quote}&rdquo;</p>
                    <footer className="mt-3 text-sm font-semibold text-muted">— {ceo.name}</footer>
                  </blockquote>
                </Reveal>
              )}
            </div>
          </Container>
        </section>
      </AboutShell>
    </>
  );
}
