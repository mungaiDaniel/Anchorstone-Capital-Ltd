import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { ceo, featureHighlights, howItWorks, products, siteConfig, whyUs } from "@/content/site";
import { absoluteUrl, organizationJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Pill } from "@/components/ui/Pill";
import { Steps } from "@/components/ui/Steps";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { getImage } from "@/content/images";
import { Watermark } from "@/components/ui/Watermark";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/hero/Hero";
import { ProductCard } from "@/components/products/ProductCard";
import { LoanCalculator } from "@/components/sections/LoanCalculator";

const title = "Logbook, SME & Study Abroad Loans in Kenya — Credit that moves you forward";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.shortName} — ${title}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { title: `${siteConfig.shortName} — ${title}`, description: siteConfig.description, url: "/" },
  twitter: { title: `${siteConfig.shortName} — ${title}`, description: siteConfig.description },
};

export default function HomePage() {
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

      {/* 1. Hero (animated 3D scene — see components/hero) */}
      <Hero />

      {/* 2. Feature highlights */}
      <section aria-label="Why Anchorstone" className="bg-paper pt-6 pb-20 sm:pb-24">
        <Container>
          <StaggerGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featureHighlights.map((f) => (
              <StaggerItem as="li" key={f.title}>
                <Card className="h-full">
                  <IconBadge name={f.icon} />
                  <h2 className="mt-5 text-xl">{f.title}</h2>
                  <p className="mt-2 text-body">{f.text}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <p className="mt-8 flex justify-center">
            <Pill>80+ years combined experience</Pill>
          </p>
        </Container>
      </section>

      {/* 3. Products */}
      <section id="products" aria-labelledby="products-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="products-title" eyebrow="Our Products" title="Financial solutions for every goal." />
            <ButtonLink href="/products" variant="link-arrow" arrow>
              View all products
            </ButtonLink>
          </div>
          <StaggerGroup as="ul" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <StaggerItem as="li" key={p.slug}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* 4. Stats (server-rendered; count-up is an enhancement) */}
      <StatBand tone="dark" />

      {/* 5. Calculator */}
      <LoanCalculator />

      {/* 6. Why choose */}
      <section aria-labelledby="why-title" className="bg-paper py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <SectionHeading id="why-title" eyebrow="Why Anchorstone" title="Your reliable financial partner." />
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {whyUs.map((w) => (
                <li key={w.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-xl">{w.title}</h3>
                    <p className="mt-1 text-body">{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="on-dark relative isolate self-start overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-10">
            <Watermark className="-right-10 -bottom-16 !w-64" />
            <IconBadge name="landmark" tone="dark" />
            <p className="eyebrow mt-6 text-on-navy">Regulated</p>
            <p className="mt-2 font-heading text-3xl text-white">Licensed by the Central Bank of Kenya</p>
            <p className="mt-3 text-on-navy">Anchorstone Capital Limited operates as a licensed credit provider.</p>
          </Reveal>
        </Container>
      </section>

      {/* 7. CEO teaser */}
      <section aria-labelledby="ceo-title" className="bg-tint py-20 sm:py-28">
        <Container>
          <Reveal className="grid overflow-hidden rounded-3xl bg-white shadow-lift md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[26rem]">
              <Image
                src={ceo.photo.src}
                alt={ceo.photo.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: ceo.photo.position }}
              />
            </div>
            <div className="p-8 sm:p-12">
              <Eyebrow>Leadership</Eyebrow>
              <h2 id="ceo-title" className="mt-4 text-3xl sm:text-4xl">
                {ceo.name}
              </h2>
              <p className="mt-1 font-semibold text-brand">{ceo.role}</p>
              <p className="mt-5 line-clamp-3 text-body">{ceo.summary}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <ButtonLink href="/about-us/ceo" arrow>
                  Meet our CEO
                </ButtonLink>
                <ButtonLink href="/about-us/team" variant="link-arrow" arrow>
                  Meet the team
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 8. How it works */}
      <section aria-labelledby="how-title" className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionHeading id="how-title" eyebrow="How it works" title="Your next step, made clear." align="center" />
          <div className="mt-14">
            <Steps steps={howItWorks} />
          </div>
          <p className="mt-12 text-center">
            <ButtonLink href="/faq" variant="link-arrow" arrow>
              Read our FAQs
            </ButtonLink>
          </p>
        </Container>
      </section>

      {/* 9. Closing CTA */}
      <CTABand image={getImage("home-hero")} />
    </>
  );
}
