import type { Metadata } from "next";
import { site } from "@/lib/site";
import { aboutClosing } from "@/content/about";
import { PageHero } from "@/components/sections/PageHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { CoreValues } from "@/components/sections/about/CoreValues";
import { MissionStatement } from "@/components/sections/about/MissionStatement";
import { CtaBand } from "@/components/sections/CtaBand";

const title = `About ${site.name} | Trusted Credit & Loan Solutions Provider`;
const description = `Learn about ${site.name}, a reliable credit and loans provider committed to empowering individuals and businesses with transparent financial solutions.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-us" },
  openGraph: { title, description, url: "/about-us" },
  twitter: { title, description },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "About Us", item: `${site.url}/about-us` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="About Us"
        title={`About ${site.name}`}
        description="Unsecured credit solutions for individuals and businesses — delivered with speed, integrity, and clarity."
        image={{ src: "/images/about-hero-nairobi-skyline.webp", alt: "Nairobi city skyline at golden hour" }}
        breadcrumb={[{ label: "About Us" }]}
      />
      <AboutStory />
      <CoreValues />
      <MissionStatement />
      <div className="pt-20 sm:pt-28">
        <CtaBand
          eyebrow="Walk with us"
          title={aboutClosing.cta}
          image={{
            src: "/images/business-loan-shop-owner.webp",
            alt: "Shop owner smiling behind the counter of her well-stocked retail shop",
          }}
        />
      </div>
    </>
  );
}
