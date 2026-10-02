import type { Metadata } from "next";
import { site } from "@/lib/site";
import { team, teamIntro } from "@/content/team";
import { directorsExperienceYears } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { TeamCard } from "@/components/team/TeamCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

const title = `Meet Our Financial Experts | ${site.name} Loan Specialists`;
const description = `Meet the experienced team behind ${site.name}. Our financial experts are dedicated to providing secure, customer-focused credit and loan services.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/our-team" },
  openGraph: { title, description, url: "/our-team" },
  twitter: { title, description },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Our Team", item: `${site.url}/our-team` },
  ],
};

export default function OurTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Our Team"
        title="Meet the team"
        description={teamIntro}
        image={{
          src: "/images/team-hero-meeting.webp",
          alt: "Professionals discussing ideas around a meeting-room table",
          position: "center 35%",
        }}
        breadcrumb={[{ label: "Our Team" }]}
      />

      <section aria-label="Team members" className="bg-lavender-50 py-20 sm:py-28">
        <Container>
          <StaggerGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {team.map((member) => (
              <StaggerItem as="li" key={member.slug}>
                <TeamCard member={member} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Figure from the About page copy: "Our directors bring a combined 42 years of experience" */}
          <Reveal className="mt-14 flex flex-col items-center gap-2 text-center sm:mt-20">
            <p className="font-mono text-5xl font-semibold text-brand-700 sm:text-6xl">
              <CountUp value={directorsExperienceYears} />
            </p>
            <p className="max-w-sm text-ink-700">
              years of combined experience our directors bring in banking, credit management and micro-lending
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="pt-20 sm:pt-28">
        <CtaBand eyebrow="Work with us" title="Apply online today for flexible repayment and quick approvals." />
      </div>
    </>
  );
}
