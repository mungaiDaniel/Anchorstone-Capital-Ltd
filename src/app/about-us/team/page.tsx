import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, team } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutShell } from "@/components/about/AboutShell";

export const metadata: Metadata = pageMetadata({
  title: "Meet the Team",
  description: `The directors and advisers behind ${siteConfig.shortName}: decades of experience in credit, investment, wealth and real estate advisory.`,
  path: "/about-us/team",
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "About Us", path: "/about-us" },
          { name: "Meet the Team", path: "/about-us/team" },
        ])}
      />
      <AboutShell
        current="/about-us/team"
        eyebrow="Our People"
        title="Meet the Team"
        intro="Experienced professionals providing direction, expertise and stewardship to Anchorstone Capital."
        breadcrumbLabel="Meet the Team"
      >
        <section aria-label="Team members" className="bg-paper py-16 sm:py-20">
          <Container>
            <StaggerGroup as="ul" className="grid gap-8 md:grid-cols-2">
              {team.map((m, i) => (
                <StaggerItem as="li" key={m.slug}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
                    <div className="relative aspect-[4/5] bg-tint">
                      <Image
                        src={m.photo.src}
                        alt={m.photo.alt}
                        fill
                        priority={i < 2}
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: m.photo.position }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <p className="eyebrow text-brand">{m.role}</p>
                      <h3 className="mt-2 text-3xl">{m.name}</h3>
                      <p className="mt-4 text-body">{m.summary}</p>
                      {m.tags && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {m.tags.map((t) => (
                            <li key={t}>
                              <Pill>{t}</Pill>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      </AboutShell>
    </>
  );
}
