import type { Metadata } from "next";
import { loanProducts } from "@/content/loans";
import { contact, site } from "@/lib/site";
import { Hero } from "@/components/hero/Hero";
import { ApplySteps } from "@/components/sections/home/ApplySteps";
import { LoanCalculator } from "@/components/sections/home/LoanCalculator";
import { LoanProductSection } from "@/components/sections/home/LoanProductSection";
import { WhyChoose } from "@/components/sections/home/WhyChoose";
import { CtaBand } from "@/components/sections/CtaBand";

const title = `${site.tagline} | ${site.name}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title, description: site.description, url: "/" },
  twitter: { title, description: site.description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: site.name,
  url: site.url,
  description: site.description,
  areaServed: { "@type": "Country", name: "Kenya" },
  telephone: contact.phone.display,
  email: contact.email.display,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.display,
    addressLocality: contact.address.locality,
    addressCountry: "KE",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ApplySteps />
      <LoanCalculator />
      {loanProducts.map((product, i) => (
        <LoanProductSection
          key={product.slug}
          product={product}
          index={i}
          reverse={i % 2 === 1}
          tone={i % 2 === 0 ? "lavender" : "white"}
        />
      ))}
      <WhyChoose />
      <CtaBand
        title="Apply online today for flexible repayment and quick approvals."
        image={{
          src: "/images/couple-smartphone-together.webp",
          alt: "Older couple laughing together while looking at a smartphone",
        }}
      />
    </>
  );
}
