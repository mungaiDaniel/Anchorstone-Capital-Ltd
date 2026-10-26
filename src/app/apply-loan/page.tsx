import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { ApplyForm } from "@/components/forms/ApplyForm";

export const metadata: Metadata = pageMetadata({
  title: "Apply for a Loan",
  description:
    "Apply online for a logbook, personal secured, study abroad or SME loan from Anchorstone Capital. Same-day approval for qualifying applicants.",
  path: "/apply-loan",
});

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ApplyLoanPage({ searchParams }: PageProps<"/apply-loan">) {
  const sp = await searchParams;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Apply Loan", path: "/apply-loan" }])} />
      <PageHeader
        eyebrow="Apply Loan"
        title="Apply for a loan"
        description="Tell us what you need. Our team reviews every application quickly and keeps you updated."
      />
      <section aria-label="Loan application" className="bg-paper pb-20 sm:pb-28">
        <Container>
          <ApplyForm
            initialProduct={first(sp.product)}
            initialAmount={first(sp.amount)?.replace(/\D/g, "")}
            initialTenure={first(sp.tenure)?.replace(/\D/g, "")}
          />
        </Container>
      </section>
    </>
  );
}
