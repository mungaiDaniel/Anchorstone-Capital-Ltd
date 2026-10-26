import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { breadcrumbJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.shortName}. Visit us in Westlands, Nairobi, call ${siteConfig.contact.phone.display} or send a message.`,
  path: "/contact-us",
});

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: PageProps<"/contact-us">) {
  const sp = await searchParams;
  const { contact } = siteConfig;

  const details = [
    { icon: MapPin, label: "Visit us", content: <p>{contact.address.display}</p> },
    {
      icon: Phone,
      label: "Call us",
      content: (
        <a href={contact.phone.href} className="font-semibold text-brand hover:underline">
          {contact.phone.display}
        </a>
      ),
    },
    {
      icon: Mail,
      label: "Email us",
      content: (
        <a href={contact.email.href} className="font-semibold break-all text-brand hover:underline">
          {contact.email.display}
        </a>
      ),
    },
    ...(contact.officeHours ? [{ icon: Clock, label: "Office hours", content: <p>{contact.officeHours}</p> }] : []),
  ];

  return (
    <>
      <JsonLd data={[organizationJsonLd(), breadcrumbJsonLd([{ name: "Contact Us", path: "/contact-us" }])]} />
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        description="Questions about a product, an application or a partnership? We’d love to hear from you."
      />
      <section aria-label="Contact" className="bg-paper pb-16 sm:pb-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
          <div>
            <h2 className="text-3xl">Our details</h2>
            <ul className="mt-8 space-y-6">
              {details.map(({ icon: IconCmp, label, content }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                    <IconCmp aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="eyebrow text-muted">{label}</p>
                    <div className="mt-1 text-ink">{content}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm initialTopic={first(sp.topic)} />
        </Container>
      </section>
      <section aria-label="Map" className="bg-paper pb-20 sm:pb-28">
        <Container>
          <MapEmbed />
        </Container>
      </section>
    </>
  );
}
