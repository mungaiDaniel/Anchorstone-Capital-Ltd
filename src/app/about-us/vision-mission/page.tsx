import type { Metadata } from "next";
import { mission, quote, siteConfig, vision } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutShell } from "@/components/about/AboutShell";

export const metadata: Metadata = pageMetadata({
  title: "Vision & Mission",
  description: `The vision, mission and motto of ${siteConfig.shortName}: fast, fair and transparent access to credit in Kenya.`,
  path: "/about-us/vision-mission",
});

export default function VisionMissionPage() {
  const blocks = [
    { label: "Our Vision", text: vision },
    { label: "Our Mission", text: mission },
    { label: "Our Motto", text: siteConfig.motto },
  ];
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "About Us", path: "/about-us" },
          { name: "Vision & Mission", path: "/about-us/vision-mission" },
        ])}
      />
      <AboutShell
        current="/about-us/vision-mission"
        eyebrow="About Us"
        title="Vision & Mission"
        intro="Where we’re headed, why we lend and the standard we hold ourselves to."
        breadcrumbLabel="Vision & Mission"
      >
        <section aria-label="Vision, mission and motto" className="bg-paper py-16 sm:py-20">
          <Container className="max-w-4xl divide-y divide-line">
            {blocks.map((b) => (
              <Reveal key={b.label} className="py-12 first:pt-0">
                <Eyebrow>{b.label}</Eyebrow>
                <h2 className="mt-5 font-heading text-3xl leading-snug sm:text-4xl">{b.text}</h2>
              </Reveal>
            ))}
          </Container>
        </section>

        <section aria-label="Brand promise" className="bg-tint py-16 sm:py-24">
          <Container>
            <Reveal>
              <blockquote className="mx-auto max-w-3xl text-center">
                <p className="font-heading text-3xl leading-snug text-ink sm:text-5xl">&ldquo;{quote}&rdquo;</p>
              </blockquote>
            </Reveal>
          </Container>
        </section>
      </AboutShell>
    </>
  );
}
