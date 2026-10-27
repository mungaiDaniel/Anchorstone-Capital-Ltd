import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage, type LegalSection } from "@/components/sections/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.shortName} collects, uses and protects your personal data under the Kenya Data Protection Act, 2019.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { contact } = siteConfig;
  const sections: LegalSection[] = [
    {
      title: "Who we are",
      body: (
        <p>
          {siteConfig.name} (“Anchorstone”, “we”) is a licensed credit provider based at {contact.address.display}. We are the data controller for the
          personal data described in this policy.
        </p>
      ),
    },
    {
      title: "What we collect",
      body: (
        <>
          <p>
            <strong>Loan and call-back forms:</strong> your name, National ID number, phone number, email address, county, employment or business type, income
            range, and the product, amount and repayment period you ask for.
          </p>
          <p>
            <strong>Contact and partner forms:</strong> your name, organisation, phone, email, topic and message.
          </p>
          <p>
            <strong>Careers form:</strong> your name, contact details, LinkedIn URL (if given), your CV and cover note.
          </p>
        </>
      ),
    },
    {
      title: "Why we use it",
      body: (
        <p>
          To respond to you; to assess and process loan applications (including a credit check, to which you consent when you apply); to consider job
          applications; to meet our legal and regulatory duties as a licensed credit provider; and to prevent fraud. We do not sell your personal data.
        </p>
      ),
    },
    {
      title: "Who we share it with",
      body: (
        <p>
          Only where needed: credit reference bureaus for credit checks; insurance partners if you ask us to arrange cover; service providers who help us run
          our systems and email; and regulators or authorities where the law requires.
        </p>
      ),
    },
    {
      title: "How long we keep it",
      body: (
        <p>
          We keep data only as long as necessary for the purpose it was collected, and as required by law for lending records. CVs from unsuccessful
          applicants are not kept longer than needed to consider the application unless you agree to be kept on our talent pool.
        </p>
      ),
    },
    {
      title: "Your rights",
      body: (
        <p>
          Under the Data Protection Act, 2019 you may ask to be informed about how your data is used, to access it, to object to its processing, and to have it
          corrected or deleted. You can also complain to the Office of the Data Protection Commissioner.
        </p>
      ),
    },
    {
      title: "Keeping your data safe",
      body: <p>We use reasonable technical and organisational measures to protect your data against loss, misuse and unauthorised access.</p>,
    },
    {
      title: "Contact us",
      body: (
        <p>
          To use your rights or ask about this policy, email{" "}
          <a href={contact.email.href} className="font-semibold text-brand hover:underline">
            {contact.email.display}
          </a>{" "}
          or call{" "}
          <a href={contact.phone.href} className="font-semibold text-brand hover:underline">
            {contact.phone.display}
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy Policy", path: "/privacy" }])} />
      <LegalPage eyebrow="Legal" title="Privacy Policy" intro="How we handle your personal data." sections={sections} />
    </>
  );
}
