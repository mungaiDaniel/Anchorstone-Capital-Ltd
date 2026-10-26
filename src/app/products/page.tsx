import type { Metadata } from "next";
import { products } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProductCard } from "@/components/sections/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Our Products",
  description:
    "Logbook loans, personal secured loans, study abroad financing, SME loans and insurance from Anchorstone Capital.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Products", path: "/products" }])} />
      <PageHeader
        eyebrow="What we offer"
        title="Our Products"
        description="Five ways we help individuals, students and businesses grow, study, build and protect what matters."
      />
      <section aria-label="All products" className="bg-paper pb-20 sm:pb-28">
        <Container>
          <StaggerGroup as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {products.map((p, i) => (
              <StaggerItem as="li" key={p.slug} className={`lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}>
                <ProductCard product={p} large />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
