import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { products, profilePdf, siteConfig, team } from "@/content/site";
import { absoluteUrl, organizationJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Watermark } from "@/components/ui/Watermark";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ProductCard } from "@/components/sections/ProductCard";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { LoanCalculator } from "@/components/sections/LoanCalculator";
import { HowToApply } from "@/components/sections/HowToApply";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { CtaBand } from "@/components/sections/CtaBand";

const title = "Credit that moves you forward";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.shortName} — ${title}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { title: `${siteConfig.shortName} — ${title}`, description: siteConfig.description, url: "/" },
  twitter: { title: `${siteConfig.shortName} — ${title}`, description: siteConfig.description },
};

const trust = ["42 years combined director experience", "Same-day approval", "CBK licensed"];

export default function HomePage() {
  const leader = team.find((m) => m.featured) ?? team[0];
  const { contact } = siteConfig;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LocalBusiness"],
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl("/brand/logo_full_blue.png"),
    description: siteConfig.description,
    telephone: contact.phone.e164,
    email: contact.email.address,
    areaServed: { "@type": "Country", name: "Kenya" },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressCountry: "KE",
    },
  };

  return (
    <>
      <JsonLd data={[organizationJsonLd(), localBusiness]} />

      {/* Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-linear-to-br from-navy via-navy to-brand text-white">
        <Watermark className="top-1/2 -right-16 -translate-y-1/2 lg:right-16 lg:w-[34rem]" />
        <Container className="relative z-10 pt-20 pb-32 sm:pt-28 sm:pb-44 lg:pt-32 lg:pb-52">
          <Reveal trigger="load" className="max-w-3xl">
            <Eyebrow tone="dark">Licensed by the Central Bank of Kenya</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.05] !text-white sm:text-6xl lg:text-7xl">
              Credit that moves you <em className="text-soft">forward.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-soft sm:text-xl">{siteConfig.tagline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/apply-loan" variant="light" size="lg" arrow>
                Apply for a Loan
              </ButtonLink>
              <ButtonLink href="#products" variant="ghost-light" size="lg">
                Explore our products
              </ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-white">
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-soft" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
        <DiagonalDivider fill="#ffffff" />
      </section>

      <StatsStrip />

      {/* Products */}
      <section id="products" aria-labelledby="products-title" className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="products-title"
            eyebrow="Our products"
            title="Five ways we can help"
            description="Credit and protection, built around how you earn, study, drive and run your business."
            align="center"
          />
          <StaggerGroup as="ul" className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {products.map((p, i) => (
              <StaggerItem as="li" key={p.slug} className={`lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <WhyChooseUs tone="tint" />
      <LoanCalculator />
      <HowToApply />

      {/* Leadership teaser */}
      <section aria-labelledby="leader-title" className="bg-tint py-20 sm:py-28">
        <Container>
          <Reveal className="grid items-center gap-10 overflow-hidden rounded-3xl bg-white shadow-lift md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[26rem]">
              <Image
                src={leader.photo.src}
                alt={leader.photo.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: leader.photo.position }}
              />
            </div>
            <div className="p-8 sm:p-12">
              <Eyebrow>Meet our leadership</Eyebrow>
              <h2 id="leader-title" className="mt-4 text-3xl sm:text-4xl">
                {leader.name}
              </h2>
              <p className="mt-1 font-semibold text-brand">{leader.role}</p>
              <p className="mt-5 line-clamp-4 text-body">{leader.summary}</p>
              <ButtonLink href="/our-team" variant="secondary" arrow className="mt-8">
                Meet the team
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Profile download */}
      <section aria-label="Company profile" className="bg-paper py-14">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-heading text-2xl text-ink">Learn more about Anchorstone</p>
              <p className="mt-1 text-body">Our products, leadership and approach, in one document.</p>
            </div>
            <a
              href={profilePdf}
              download
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-navy"
            >
              <Download aria-hidden="true" className="size-4" />
              Download our company profile (PDF)
            </a>
          </div>
        </Container>
      </section>

      <PartnersStrip slim />
      <div className="pt-20 sm:pt-28">
        <CtaBand />
      </div>
    </>
  );
}
