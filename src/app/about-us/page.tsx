import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { about, aboutTabs, siteConfig } from "@/content/site";
import { breadcrumbJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Watermark } from "@/components/ui/Watermark";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutShell } from "@/components/about/AboutShell";

export const metadata: Metadata = pageMetadata({
  title: "About Anchorstone Capital — Licensed Credit Provider in Nairobi",
  description: `${siteConfig.shortName} is a private financial institution in Nairobi, licensed by the Central Bank of Kenya as a credit provider. Meet the company, our pillars and our expertise.`,
  path: "/about-us",
});

const previews = [
  { ...aboutTabs[1], text: "Where we’re headed and how we get there." },
  { ...aboutTabs[2], text: "The four principles behind every loan." },
  { ...aboutTabs[3], text: "The experience and vision leading Anchorstone." },
  { ...aboutTabs[4], text: "The directors and advisers behind our work." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), breadcrumbJsonLd([{ name: "About Us", path: "/about-us" }])]} />
      <AboutShell
        current="/about-us"
        eyebrow="About Us"
        title={siteConfig.motto}
        intro={about.lead}
        breadcrumbLabel="About Us"
      >
        {/* Our story */}
        <section aria-labelledby="story-title" className="bg-paper py-20 sm:py-24">
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading id="story-title" eyebrow="Our story" title="Fast, fair credit, built on experience." />
              <div className="mt-6 space-y-5 text-lg leading-relaxed">
                {about.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="on-dark relative isolate flex min-h-[22rem] items-end overflow-hidden rounded-3xl bg-linear-to-br from-navy to-brand p-8 text-white sm:p-12">
              <Watermark className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !opacity-[0.09]" />
              <div className="relative">
                <p className="font-heading text-7xl text-white sm:text-8xl">42</p>
                <p className="eyebrow mt-2 text-on-navy">yrs combined director experience</p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Pillars */}
        <section aria-labelledby="pillars-title" className="bg-tint py-20 sm:py-24">
          <Container>
            <SectionHeading id="pillars-title" eyebrow="What we stand for" title="Three pillars" align="center" />
            <StaggerGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
              {about.pillars.map((p) => (
                <StaggerItem as="li" key={p.title}>
                  <Card className="h-full">
                    <IconBadge name={p.icon} />
                    <h3 className="mt-5 text-2xl">{p.title}</h3>
                    <p className="mt-2 text-body">{p.text}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>

        {/* Core expertise + licence */}
        <section aria-labelledby="expertise-title" className="bg-paper py-20 sm:py-24">
          <Container>
            <SectionHeading id="expertise-title" eyebrow="Our foundation" title="Core expertise" />
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {about.expertise.map((e) => (
                <li key={e.title} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
                  <IconBadge name={e.icon} />
                  <p className="font-heading text-xl text-ink">{e.title}</p>
                </li>
              ))}
            </ul>

            <Reveal className="mt-12 flex flex-col gap-5 rounded-2xl bg-tint p-7 sm:flex-row sm:items-center sm:p-9">
              <IconBadge name="landmark" size="lg" />
              <div>
                <h3 className="text-2xl">Licensed &amp; regulated</h3>
                <p className="mt-2 text-body">
                  Anchorstone Capital Limited is licensed by the Central Bank of Kenya as a credit provider.
                </p>
                {siteConfig.licenceNumber && <p className="mt-2 text-sm font-semibold text-ink">Licence no. {siteConfig.licenceNumber}</p>}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Previews */}
        <section aria-label="Learn more about Anchorstone" className="bg-paper pb-4">
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {previews.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col gap-2 rounded-2xl border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
                  >
                    <span className="font-heading text-2xl text-ink">{p.label}</span>
                    <span className="text-sm text-body">{p.text}</span>
                    <ArrowRight aria-hidden="true" className="mt-auto size-5 text-brand transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </AboutShell>
    </>
  );
}
