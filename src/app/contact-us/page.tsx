import type { Metadata } from "next";
import { contact, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCards } from "@/components/sections/contact/ContactCards";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { MapEmbed } from "@/components/sections/contact/MapEmbed";
import { Reveal } from "@/components/motion/Reveal";

const title = `Contact ${site.name} | Get Help with Loans & Credit Today`;
const description = `Need assistance with loans or credit services? Contact ${site.name} today for fast support, loan inquiries, and financial guidance.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact-us" },
  openGraph: { title, description, url: "/contact-us" },
  twitter: { title, description },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: `${site.url}/contact-us` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${site.url}/contact-us`,
    about: {
      "@type": "FinancialService",
      name: site.name,
      telephone: contact.phone.display,
      email: contact.email.display,
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address.display,
        addressLocality: contact.address.locality,
        addressCountry: "KE",
      },
    },
  },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch with us"
        description="We would love to hear from you!"
        image={{
          src: "/images/contact-hero-westlands-nairobi.webp",
          alt: "Office towers in Westlands, Nairobi, under a bright cloudy sky",
          position: "center 40%",
        }}
        breadcrumb={[{ label: "Contact Us" }]}
        overlapBelow
      />

      <div className="bg-lavender-50 pb-20 sm:pb-28">
        <ContactCards />

        <Container className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="min-h-80 lg:min-h-0">
            <MapEmbed />
          </Reveal>
        </Container>
      </div>
    </>
  );
}
