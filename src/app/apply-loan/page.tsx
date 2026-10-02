import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ApplyAside } from "@/components/sections/apply/ApplyAside";
import { ApplicationForm } from "@/components/sections/apply/ApplicationFormWithQuery";

const title = `Apply for a Loan Online | Fast Approval with ${site.name}`;
const description = `Apply for a fast, flexible loan with ${site.name}. Simple online application, quick approval, and affordable repayment options available.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/apply-loan" },
  openGraph: { title, description, url: "/apply-loan" },
  twitter: { title, description },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Apply Loan", item: `${site.url}/apply-loan` },
  ],
};

export default function ApplyLoanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Apply Loan"
        title="You are a step closer to your dreams"
        description="Our fast and affordable loan process is built to support your ambitions with speed, clarity, and care."
        image={{
          src: "/images/hero-top-up-loan-carpenter-phone.webp",
          alt: "Carpenter in his workshop celebrating good news on his phone",
          position: "60% 30%",
        }}
        breadcrumb={[{ label: "Apply Loan" }]}
      />

      <section aria-label="Loan application" className="bg-lavender-50 py-16 sm:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <div className="order-2 lg:order-1">
            <ApplyAside />
          </div>
          <div className="order-1 lg:order-2">
            <ApplicationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
