import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getMember, summaryOf, team } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProfilePhoto } from "@/components/team/ProfilePhoto";
import { TeamCard } from "@/components/team/TeamCard";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const dynamicParams = false;

export function generateStaticParams() {
  return team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/our-team/[slug]">): Promise<Metadata> {
  const member = getMember((await params).slug);
  if (!member) return {};
  const title = `${member.name} — ${member.role} | ${site.name}`;
  const description = summaryOf(member);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/our-team/${member.slug}` },
    openGraph: { title, description, url: `/our-team/${member.slug}`, type: "profile" },
    twitter: { title, description },
  };
}

export default async function TeamMemberPage({ params }: PageProps<"/our-team/[slug]">) {
  const member = getMember((await params).slug);
  if (!member) notFound();
  const others = team.filter((m) => m.slug !== member.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/our-team/${member.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="relative isolate overflow-hidden bg-lavender-50 pt-10 pb-20 sm:pt-14 sm:pb-28">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-72 bg-linear-to-b from-brand-50 to-transparent" />
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-600">
              <li>
                <Link href="/" className="transition hover:text-brand-700">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/our-team" className="transition hover:text-brand-700">Our Team</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-brand-800">{member.name}</li>
            </ol>
          </nav>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* Profile card */}
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift">
                <ProfilePhoto
                  member={member}
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]"
                />
                <div className="p-7">
                  <p className="eyebrow text-brand-600">{member.role}</p>
                  <h1 className="mt-2 text-3xl leading-tight font-semibold sm:text-4xl">{member.name}</h1>
                  <div className="mt-6 flex items-end gap-4 border-t border-line pt-6">
                    <p className="font-mono text-5xl font-semibold text-brand-700">
                      <CountUp value={member.experienceYears} suffix="+" />
                    </p>
                    <p className="pb-1.5 text-sm leading-snug text-ink-700">{member.experienceLabel}</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Bio */}
            <article className="rounded-[2rem] border border-line bg-white p-7 shadow-soft sm:p-10">
              <h2 className="eyebrow flex items-center gap-3 text-brand-600">
                <span aria-hidden="true" className="h-px w-8 bg-brand-300" />
                About {member.name.split(" ")[0]}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed">
                {member.bio.map((p) => (
                  <Reveal key={p}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>

              {member.highlights && (
                <div className="mt-10">
                  <h3 className="text-xl font-semibold">{member.highlights.title}</h3>
                  <StaggerGroup as="ul" className="relative mt-6 space-y-4 border-l-2 border-brand-100 pl-6">
                    {member.highlights.items.map((item) => (
                      <StaggerItem as="li" key={item} className="relative leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="absolute top-1 -left-[2.1rem] flex size-5 items-center justify-center rounded-full bg-brand-700 text-white ring-4 ring-white"
                        >
                          <CheckIcon className="size-3" strokeWidth={2.5} />
                        </span>
                        {item}
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </div>
              )}

              {member.closing && (
                <Reveal>
                  <p className="mt-10 rounded-2xl bg-lavender-50 p-6 text-lg leading-relaxed text-ink-700">{member.closing}</p>
                </Reveal>
              )}

              <Link
                href="/our-team"
                className="mt-10 inline-flex items-center gap-2 font-mono text-sm font-medium text-brand-700 hover:underline"
              >
                <ArrowRightIcon className="size-4 rotate-180" />
                Back to the team
              </Link>
            </article>
          </div>
        </Container>
      </section>

      <section aria-labelledby="more-team-title" className="bg-white py-20 sm:py-24">
        <Container>
          <h2 id="more-team-title" className="text-2xl font-semibold sm:text-3xl">
            Meet the rest of the team
          </h2>
          <StaggerGroup as="ul" className="mt-10 grid gap-6 sm:grid-cols-2">
            {others.map((m) => (
              <StaggerItem as="li" key={m.slug}>
                <TeamCard member={m} compact headingLevel="h3" />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <CtaBand title="Apply online today for flexible repayment and quick approvals." />
    </>
  );
}
