import type { Metadata } from "next";
import Image from "next/image";
import { news, siteConfig } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Media & News",
  description: `News, announcements and press contacts for ${siteConfig.shortName}.`,
  path: "/media",
});

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function MediaPage() {
  const { contact } = siteConfig;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Media & News", path: "/media" }])} />
      <PageHeader eyebrow="Newsroom" title="Media & News" />

      <section aria-labelledby="press-title" className="bg-paper pb-16 sm:pb-20">
        <Container>
          <div className="rounded-2xl bg-tint p-7 sm:p-10">
            <Eyebrow>Press enquiries</Eyebrow>
            <h2 id="press-title" className="mt-3 text-3xl">
              Press enquiries
            </h2>
            <p className="mt-3 max-w-2xl text-body">
              Journalists and media partners can reach us directly for interviews, comment and company information.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3 font-semibold">
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
        </Container>
      </section>

      <section aria-labelledby="news-title" className="bg-paper pb-20 sm:pb-28">
        <Container>
          <h2 id="news-title" className="text-3xl sm:text-4xl">
            Latest news
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
    </>
  );
}
