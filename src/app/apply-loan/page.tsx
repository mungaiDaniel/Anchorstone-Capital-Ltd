import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getImage } from "@/content/images";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApplyStepper } from "@/components/forms/ApplyStepper";

export const metadata: Metadata = pageMetadata({
  title: "Apply for a Loan — Logbook, Personal, Study Abroad & SME",
  description:
    "Apply online for a logbook, personal secured, study abroad or SME loan from Anchorstone Capital. Same-day approval for qualifying applicants.",
  path: "/apply-loan",
});

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ApplyLoanPage({ searchParams }: PageProps<"/apply-loan">) {
  const sp = await searchParams;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Apply for a Loan", path: "/apply-loan" }])} />
      <PageHero
        image={getImage("how-it-works")}
        eyebrow="Apply for a Loan"
        title="Tell us about your plans."
        intro="Give us a little more detail and our team will review your application quickly and keep you updated."
        breadcrumb={[{ label: "Apply for a Loan" }]}
      />
      <section aria-label="Loan application" className="bg-paper pb-20 sm:pb-28">
        <Container>
          <ApplyStepper
            initialProduct={first(sp.product)}
            initialAmount={first(sp.amount)?.replace(/\D/g, "")}
            initialTenure={first(sp.tenure)?.replace(/\D/g, "")}
          />
        </Container>
      </section>
    </>
  );
}
