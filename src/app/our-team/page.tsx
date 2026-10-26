import type { Metadata } from "next";
import Image from "next/image";
import { team, type TeamMember } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Meet Our Team",
  description:
    "The directors and advisers behind Anchorstone Capital: decades of experience in credit, risk, investment, wealth and real estate advisory.",
  path: "/our-team",
});

function Portrait({ member, sizes, priority, className }: { member: TeamMember; sizes: string; priority?: boolean; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-tint ${className}`}>
      <Image
        src={member.photo.src}
        alt={member.photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition: member.photo.position ?? "center top" }}
      />
    </div>
  );
}

function Leader({ member }: { member: TeamMember }) {
  return (
    <section aria-labelledby={`${member.slug}-name`} className="bg-paper pb-16 sm:pb-24">
      <Container>
        <Reveal className="grid overflow-hidden rounded-3xl bg-white shadow-lift md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Portrait member={member} priority sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5] md:aspect-auto md:min-h-[32rem]" />
          <div className="on-dark flex flex-col justify-center bg-navy p-8 text-white sm:p-12">
            <Eyebrow tone="dark">{member.role}</Eyebrow>
            <h2 id={`${member.slug}-name`} className="mt-4 text-4xl !text-white sm:text-5xl">
              {member.name}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-soft">{member.summary}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          {member.highlights && (
            <Reveal>
              <h3 className="text-3xl">Career highlights</h3>
              <ol className="relative mt-8 space-y-8 border-l border-line pl-8">
                {member.highlights.map((h) => (
                  <li key={`${h.org}-${h.title}`} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute top-1.5 -left-[2.4rem] size-3 rounded-full border-2 ${
                        h.current ? "border-brand bg-brand" : "border-brand/40 bg-white"
                      }`}
                    />
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-ink">{h.title}</span>
                      {h.current && (
                        <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">Current</span>
                      )}
                    </p>
                    <p className="text-sm font-semibold text-brand">{h.org}</p>
                    <p className="mt-1 text-body">{h.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}
          <div className="space-y-10">
            {member.education && (
              <Reveal>
                <h3 className="text-3xl">Education</h3>
                <ul className="mt-5 space-y-3">
                  {member.education.map((e) => (
                    <li key={e} className="rounded-xl bg-tint px-4 py-3 text-ink">
                      {e}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {member.quote && (
              <Reveal>
                <blockquote className="border-l-4 border-brand pl-6">
                  <p className="font-heading text-2xl leading-snug text-ink">&ldquo;{member.quote}&rdquo;</p>
                  <footer className="mt-3 text-sm font-semibold text-muted">— {member.name}</footer>
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function OurTeamPage() {
  const featured = team.filter((m) => m.featured);
  const others = team.filter((m) => !m.featured);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Our Team", path: "/our-team" }])} />
      <PageHeader eyebrow="Our people" title="Meet Our Team" />

      {featured.map((m) => (
        <Leader key={m.slug} member={m} />
      ))}

      {others.length > 0 && (
        <section aria-label="Team" className="bg-tint py-20 sm:py-28">
          <Container>
            <StaggerGroup as="ul" className="grid gap-8 md:grid-cols-2">
              {others.map((m) => (
                <StaggerItem as="li" key={m.slug}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft sm:flex-row md:flex-col lg:flex-row">
                    <Portrait
                      member={m}
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 40vw, 100vw"
                      className="aspect-[4/5] sm:w-2/5 sm:shrink-0 md:w-full lg:w-2/5 lg:aspect-auto"
                    />
                    <div className="flex flex-col p-6 sm:p-8">
                      <p className="eyebrow text-brand">{m.role}</p>
                      <h2 className="mt-2 text-3xl">{m.name}</h2>
                      <p className="mt-4 text-body">{m.summary}</p>
                      {m.tags && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {m.tags.map((t) => (
                            <li key={t} className="rounded-full bg-tint px-3 py-1.5 text-xs font-semibold text-brand">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      )}

      <div className="pt-20 sm:pt-28">
        <CtaBand eyebrow="Work with us" />
      </div>
    </>
  );
}
