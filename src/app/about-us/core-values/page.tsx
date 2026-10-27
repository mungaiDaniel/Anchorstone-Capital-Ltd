import type { Metadata } from "next";
import { about, siteConfig, values } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutShell } from "@/components/about/AboutShell";

export const metadata: Metadata = pageMetadata({
  title: "Core Values",
  description: `Integrity, transparency, responsible lending and client-first service — the values behind every ${siteConfig.shortName} loan.`,
  path: "/about-us/core-values",
});

export default function CoreValuesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "About Us", path: "/about-us" },
          { name: "Core Values", path: "/about-us/core-values" },
        ])}
      />
      <AboutShell
        current="/about-us/core-values"
        eyebrow="About Us"
        title="Core Values"
        intro="Four principles that shape every conversation, recommendation and loan."
        breadcrumbLabel="Core Values"
      >
        <section aria-label="Our values" className="bg-paper py-16 sm:py-20">
          <Container>
            <StaggerGroup as="ol" className="grid gap-5 md:grid-cols-2">
              {values.map((v, i) => (
                <StaggerItem as="li" key={v.title}>
                  <Card className="h-full">
                    <div className="flex items-start justify-between">
                      <IconBadge name={v.icon} />
                      <span aria-hidden="true" className="font-heading text-6xl leading-none text-brand/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-6 text-3xl">{v.title}</h2>
                    <p className="mt-3 text-body">{v.text}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>

        <section aria-labelledby="exist-title" className="bg-tint py-16 sm:py-24">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow className="justify-center">Why we exist</Eyebrow>
              <h2 id="exist-title" className="sr-only">
                Why we exist
              </h2>
              <p className="mt-5 font-heading text-2xl leading-snug text-ink sm:text-3xl">{about.whyWeExist}</p>
            </Reveal>
          </Container>
        </section>
      </AboutShell>
    </>
  );
}
