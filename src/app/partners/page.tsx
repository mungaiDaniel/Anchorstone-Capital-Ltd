import type { Metadata } from "next";
import { partnerPitch } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { getImage } from "@/content/images";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { PartnerForm } from "@/components/forms/PartnerForm";

export const metadata: Metadata = pageMetadata({
  title: "Partners — Partner with Anchorstone Capital",
  description:
    "Insurance underwriters, motor dealers and valuers, education agents and institutions, employers and SACCOs: partner with Anchorstone Capital.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Partners", path: "/partners" }])} />
      <PageHero image={getImage("partners")} eyebrow="Partners" title="Partnering for progress." breadcrumb={[{ label: "Partners" }]} />

      <section aria-labelledby="who-title" className="bg-paper py-16 sm:py-20">
        <Container>
          <SectionHeading id="who-title" eyebrow="Who we work with" title="Organisations that help our clients grow." description={partnerPitch.intro} />
          <StaggerGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerPitch.types.map((t) => (
              <StaggerItem as="li" key={t.title}>
                <Card className="h-full">
                  <IconBadge name={t.icon} />
                  <h3 className="mt-5 text-xl">{t.title}</h3>
                  <p className="mt-2 text-body">{t.text}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <PartnersStrip />

      <section aria-labelledby="become-title" className="bg-tint py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading id="become-title" eyebrow="Become a partner" title="Let’s talk." description="Tell us about your organisation and how we could work together." />
          <div className="mt-10">
            <PartnerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
