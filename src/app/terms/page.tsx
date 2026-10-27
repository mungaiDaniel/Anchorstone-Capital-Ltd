import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms for using the ${siteConfig.shortName} website and submitting enquiries or applications.`,
  path: "/terms",
});

export default function TermsPage() {
  const sections: LegalSection[] = [
    {
      title: "About this website",
      body: (
        <p>
          This website is operated by {siteConfig.name}, a credit provider licensed by the Central Bank of Kenya. By using it you agree to these terms.
        </p>
      ),
    },
    {
      title: "Information only",
      body: (
        <p>
          Content on this site, including product descriptions, amounts and the loan calculator, is general information and is indicative only. It is not an
          offer or a commitment to lend. Final terms depend on your application and our credit assessment.
        </p>
      ),
    },
    {
      title: "Applications and enquiries",
      body: (
        <p>
          Submitting a form does not guarantee approval. You confirm that the information you give is accurate and complete. We may decline an application or
          ask for more documents. Requirements may vary after assessment.
        </p>
      ),
    },
    {
      title: "Insurance",
      body: <p>Insurance cover is arranged through licensed insurance partners and is subject to their terms and underwriting.</p>,
    },
    {
      title: "Careers",
      body: <p>Anchorstone Capital will never ask for payment at any stage of recruitment. Report any request for payment to us immediately.</p>,
    },
    {
      title: "Acceptable use",
      body: <p>Do not misuse this site, attempt to disrupt it, or submit false or misleading information.</p>,
    },
    {
      title: "Liability",
      body: <p>We take care to keep the site accurate and available but provide it “as is”, and to the extent the law allows we are not liable for loss arising from its use.</p>,
    },
    {
      title: "Privacy and law",
      body: (
        <p>
          How we use your data is explained in our{" "}
          <Link href="/privacy" className="font-semibold text-brand hover:underline">
            Privacy Policy
          </Link>
          . These terms are governed by the laws of Kenya.
        </p>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Terms & Conditions", path: "/terms" }])} />
      <LegalPage eyebrow="Legal" title="Terms & Conditions" intro="The ground rules for using this website." sections={sections} />
    </>
  );
}
