import type { Metadata } from "next";
import { faqs, siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqTabs } from "@/components/faq/FaqTabs";

export const metadata: Metadata = pageMetadata({
  title: "FAQs — Loans, Applying & Insurance in Kenya",
  description: `Answers to common questions about applying for a loan or insurance with ${siteConfig.shortName}.`,
  path: "/faq",
});

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <JsonLd data={[faqLd, breadcrumbJsonLd([{ name: "FAQs", path: "/faq" }])]} />
      <PageHero eyebrow="Help Centre" title="Frequently Asked Questions" breadcrumb={[{ label: "Media" }, { label: "FAQs" }]} />

      <section aria-label="Questions and answers" className="bg-paper pb-16 sm:pb-20">
        <Container className="max-w-3xl">
          <FaqTabs />
        </Container>
      </section>

      <section aria-labelledby="still-title" className="bg-paper pb-20 sm:pb-28">
        <Container>
          <div className="on-dark rounded-3xl bg-linear-to-br from-navy to-brand p-8 text-center text-white sm:p-12">
            <h2 id="still-title" className="text-3xl !text-white">
              Still have questions?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-on-navy">Our team is happy to help — call, email or send us a message.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact-us" variant="light" size="lg" arrow>
                Contact us
              </ButtonLink>
              <ButtonLink href={siteConfig.contact.phone.href} variant="ghost-light" size="lg">
                {siteConfig.contact.phone.display}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
