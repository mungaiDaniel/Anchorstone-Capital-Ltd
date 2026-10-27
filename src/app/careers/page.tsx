import type { Metadata } from "next";
import { careers, siteConfig } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Watermark } from "@/components/ui/Watermark";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { CareersOpenings } from "@/components/careers/CareersOpenings";

export const metadata: Metadata = pageMetadata({
  title: "Careers at Anchorstone Capital — Jobs in Credit & Finance, Nairobi",
  description: careers.intro,
  path: "/careers",
});

export default function CareersPage() {
  const jobPostings = careers.roles.map((r) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: r.title,
    description: r.summary,
    employmentType: r.type,
    ...(r.deadline ? { validThrough: r.deadline } : {}),
    hiringOrganization: { "@type": "Organization", name: siteConfig.name, sameAs: siteConfig.url },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: r.location, addressCountry: "KE" },
    },
    url: absoluteUrl("/careers"),
  }));

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Careers", path: "/careers" }]), ...jobPostings]} />
      <PageHero
        eyebrow="Careers"
        title="Build a career that moves people forward."
        intro={careers.intro}
        breadcrumb={[{ label: "Careers" }]}
      >
        <ButtonLink href="#openings" variant="light" size="lg">
          View opportunities ↓
        </ButtonLink>
        <ButtonLink href="#apply" variant="ghost-light" size="lg">
          Send your CV
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="why-title" className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading id="why-title" eyebrow="Why work with us" title="Grow where your work matters." align="center" />
          <StaggerGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
            {careers.reasons.map((r) => (
              <StaggerItem as="li" key={r.title}>
                <Card className="h-full">
                  <IconBadge name={r.icon} />
                  <h3 className="mt-5 text-2xl">{r.title}</h3>
                  <p className="mt-2 text-body">{r.text}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section aria-labelledby="life-title" className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading id="life-title" eyebrow="Life at Anchorstone" title="How we work." />
          <div className="mt-12 space-y-8">
            {careers.culture.map((c, i) => (
              <Reveal key={c.title} className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <h3 className="text-3xl">{c.title}</h3>
                  <p className="mt-3 text-lg text-body">{c.text}</p>
                </div>
                <div className="on-dark relative isolate flex h-56 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-navy to-brand">
                  <Watermark className="!w-40 !opacity-[0.1]" />
                  <IconBadge name={c.icon} tone="dark" size="lg" className="relative" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CareersOpenings />
    </>
  );
}
