import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { news, profilePdf, siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getImage } from "@/content/images";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Media Centre — News & Press",
  description: `News, announcements and press contacts for ${siteConfig.shortName}.`,
  path: "/media",
});

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function MediaPage() {
  const { contact } = siteConfig;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Media Centre", path: "/media" }])} />
      <PageHero image={getImage("media")} eyebrow="Newsroom" title="Media Centre" breadcrumb={[{ label: "Media Centre" }]} />

      <section aria-labelledby="news-title" className="bg-paper py-12 sm:py-16">
        <Container>
          <h2 id="news-title" className="text-3xl sm:text-4xl">
            News &amp; announcements
          </h2>
          {news.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-body">
              News and announcements will appear here.
            </p>
          ) : (
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {news.map((n) => (
                <li key={n.title}>
                  <article className="h-full overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                    {n.image && (
                      <div className="relative aspect-[16/9]">
                        <Image src={n.image.src} alt={n.image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <time dateTime={n.date} className="eyebrow text-muted">
                        {formatDate(n.date)}
                      </time>
                      <h3 className="mt-2 text-2xl">{n.title}</h3>
                      <p className="mt-3 text-body">{n.summary}</p>
                      {n.href && (
                        <a href={n.href} className="mt-4 inline-block font-semibold text-brand hover:underline">
                          Read more<span className="sr-only"> about {n.title}</span>
                        </a>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section aria-labelledby="press-title" className="bg-paper pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-8 rounded-2xl bg-tint p-7 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 id="press-title" className="text-3xl">
                Press enquiries
              </h2>
              <p className="mt-3 text-body">Journalists and media partners can reach us directly for interviews, comment and company information.</p>
              <ul className="mt-5 space-y-2 font-semibold">
                <li>
                  <a href={contact.email.href} className="text-brand hover:underline">
                    {contact.email.display}
                  </a>
                </li>
                <li>
                  <a href={contact.phone.href} className="text-brand hover:underline">
                    {contact.phone.display}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex items-center lg:justify-end">
              <a
                href={profilePdf}
                download
                className="inline-flex h-13 items-center gap-2 rounded-[10px] bg-brand px-7 text-[0.95rem] font-semibold text-white transition hover:bg-navy"
              >
                <Download aria-hidden="true" className="size-4" />
                Download company profile (PDF)
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
