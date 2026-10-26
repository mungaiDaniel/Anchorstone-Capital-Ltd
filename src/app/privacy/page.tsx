import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: `How ${siteConfig.shortName} collects, uses and protects your personal data under the Kenya Data Protection Act, 2019.`,
  path: "/privacy",
});

// TODO(client): this notice is a working draft and must be reviewed by legal counsel before it is relied on
// (data controller registration number, retention periods, any third-party processors, DPO contact).
export default function PrivacyPage() {
  const { contact } = siteConfig;
  const sections: { title: string; body: React.ReactNode }[] = [
    {
      title: "Who we are",
      body: (
        <p>
          {siteConfig.name} (“Anchorstone”, “we”) is a credit provider based at {contact.address.display}. We are the data
          controller for the personal data described in this notice.
        </p>
      ),
    },
    {
      title: "What we collect",
      body: (
        <p>
          When you apply for a loan or contact us we collect the details you give us: your name, National ID number, phone
          number, email address, county, employment or business type, the product and amount you are asking for, and the
          content of your message. Later in the process we may ask for supporting documents such as payslips and bank or
          M-Pesa statements.
        </p>
      ),
    },
    {
      title: "How we use it",
      body: (
        <p>
          We use your data to respond to your enquiry, assess and process your application (including a credit check, which
          you consent to when you apply), meet our legal and regulatory obligations as a licensed credit provider, and
          prevent fraud. We do not sell your personal data.
        </p>
      ),
    },
    {
      title: "Who we share it with",
      body: (
        <p>
          We share data only where needed: with credit reference bureaus for credit checks, with insurance partners if you
          ask us to arrange cover, with service providers who help us run our systems and email, and with regulators or
          authorities where the law requires it.
        </p>
      ),
    },
    {
      title: "Your rights",
      body: (
        <p>
          Under the Data Protection Act, 2019 you have the right to be informed about how your data is used, to access it,
          to object to its processing, to ask us to correct or delete it, and to complain to the Office of the Data
          Protection Commissioner.
        </p>
      ),
    },
    {
      title: "Keeping your data safe",
      body: <p>We use reasonable technical and organisational measures to protect your data and keep it only as long as we need it.</p>,
    },
    {
      title: "Contact us",
      body: (
        <p>
          To exercise your rights or ask a question about this notice, email{" "}
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
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy", path: "/privacy" }])} />
      <PageHeader eyebrow="Legal" title="Privacy Notice" />
      <section aria-label="Privacy notice" className="bg-paper pb-20 sm:pb-28">
        <Container className="max-w-3xl space-y-10 text-lg leading-relaxed">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-3xl">{s.title}</h2>
              <div className="mt-3">{s.body}</div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
