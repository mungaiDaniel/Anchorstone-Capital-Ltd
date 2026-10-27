import type { Metadata } from "next";
import { Suspense } from "react";
import { productProcess } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Steps } from "@/components/ui/Steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/ui/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";

export const metadata: Metadata = pageMetadata({
  title: "Our Products — Logbook, Personal, Study Abroad & SME Loans in Kenya",
  description:
    "Logbook loans, personal secured loans, study abroad financing, SME loans and insurance from Anchorstone Capital, a CBK-licensed credit provider in Nairobi.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Products", path: "/products" }])} />
      <PageHero
        eyebrow="Our Products"
        title="Financial solutions for every goal."
        intro="Credit and protection built around how you earn, study, drive and run your business."
        breadcrumb={[{ label: "Products" }]}
      />

      <section aria-label="All products" className="bg-paper pb-12 sm:pb-16">
        <Container>
          {/* Suspense: the filter reads ?category= on the client. */}
          <Suspense fallback={<div className="h-96" />}>
            <ProductsExplorer />
          </Suspense>
          <p className="mt-8 text-center text-sm text-muted">Requirements are indicative and may vary by product and assessment.</p>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="bg-tint py-20 sm:py-24">
        <Container>
          <SectionHeading id="process-title" eyebrow="The process" title="From first call to funds." align="center" />
          <div className="mt-14">
            <Steps steps={productProcess} />
          </div>
        </Container>
      </section>

      <div className="pt-20 sm:pt-28">
        <CTABand />
      </div>
    </>
  );
}
