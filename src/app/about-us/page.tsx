import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import { about, mission, quote, siteConfig, values, vision } from "@/content/site";
import { breadcrumbJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { ButtonLink } from "@/components/ui/Button";
import { Watermark } from "@/components/ui/Watermark";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PartnersStrip } from "@/components/sections/PartnersStrip";

export const metadata: Metadata = pageMetadata({
  title: "About Anchorstone",
  description: `${siteConfig.shortName} is a private financial institution in Nairobi, licensed by the Central Bank of Kenya as a credit provider. Meet the company, our mission and our values.`,
  path: "/about-us",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), breadcrumbJsonLd([{ name: "About Us", path: "/about-us" }])]} />
      <PageHeader eyebrow="Who we are" title="About Anchorstone" fill="var(--color-paper)" />

      {/* Intro */}
      <section aria-label="Introduction" className="bg-paper pb-16 sm:pb-20">
        <Container className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <p className="font-heading text-3xl leading-snug text-ink sm:text-4xl">{about.lead}</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed">
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="self-start rounded-2xl border border-line bg-white p-7 shadow-soft">
            <IconBadge name="landmark" />
            <h2 className="mt-5 text-2xl">Licensed & regulated</h2>
            <p className="mt-3 text-body">
              Anchorstone Capital Limited is licensed by the Central Bank of Kenya as a credit provider.
            </p>
            {siteConfig.licenceNumber && (
              <p className="mt-4 text-sm font-semibold text-ink">Licence no. {siteConfig.licenceNumber}</p>
            )}
          </Reveal>
        </Container>
      </section>

      <StatsStrip />

      {/* Core expertise */}
      <section aria-labelledby="expertise-title" className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionHeading id="expertise-title" eyebrow="Our foundation" title="Core expertise" align="center" />
          <StaggerGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
            {about.expertise.map((e) => (
              <StaggerItem as="li" key={e.title}>
                <Card className="flex h-full items-center gap-4">
                  <IconBadge name={e.icon} />
                  <p className="font-heading text-xl text-ink">{e.title}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="bg-tint py-20 sm:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="on-dark relative isolate overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-12">
            <Watermark className="-right-10 -bottom-16 !w-64" />
            <Eyebrow tone="dark">Our mission</Eyebrow>
            <h2 className="mt-4 text-3xl !text-white">Mission</h2>
            <p className="mt-5 text-lg leading-relaxed text-soft">{mission}</p>
          </Reveal>
          <Reveal delay={0.1} className="on-dark relative isolate overflow-hidden rounded-3xl bg-brand p-8 text-white sm:p-12">
            <Watermark className="-right-10 -bottom-16 !w-64" />
            <Eyebrow tone="dark">Our vision</Eyebrow>
            <h2 className="mt-4 text-3xl !text-white">Vision</h2>
            <p className="mt-5 text-lg leading-relaxed text-tint-2">{vision}</p>
          </Reveal>
          <Reveal className="lg:col-span-2">
            <blockquote className="mx-auto max-w-3xl py-8 text-center">
              <p className="font-heading text-3xl leading-snug text-ink sm:text-4xl">&ldquo;{quote}&rdquo;</p>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionHeading id="values-title" eyebrow="What guides us" title="Core values" />
          <StaggerGroup as="ol" className="mt-12 divide-y divide-line border-y border-line">
            {values.map((v, i) => (
              <StaggerItem as="li" key={v.title} className="grid gap-3 py-7 sm:grid-cols-[5rem_1fr_2fr] sm:items-baseline sm:gap-8">
                <span aria-hidden="true" className="font-heading text-4xl text-brand/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl">{v.title}</h3>
                <p className="text-body">{v.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <WhyChooseUs tone="tint" />
      <PartnersStrip />

      {/* CTA to team + contact */}
      <section aria-labelledby="about-cta" className="bg-paper py-20 text-center sm:py-28">
        <Container>
          <Landmark aria-hidden="true" className="mx-auto size-8 text-brand" strokeWidth={1.5} />
          <h2 id="about-cta" className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl">
            Get to know the people behind Anchorstone
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/our-team" size="lg" arrow>
              Meet our team
            </ButtonLink>
            <ButtonLink href="/contact-us" variant="secondary" size="lg">
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
