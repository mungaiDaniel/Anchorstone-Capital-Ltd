import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { Container } from "@/components/ui/Container";

// Photo review page (Prompt 13). Not indexed, not in the sitemap, disallowed in robots.txt.
export const metadata: Metadata = { title: "Photo review", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

interface Candidate {
  slot: string;
  used: string;
  format: "hero" | "card" | "tall";
  n: number;
  source: string;
  id: string;
  pageUrl: string;
  photographer: string;
  photographerUrl: string;
  licence: string;
  originalWidth: number;
  originalHeight: number;
  description: string;
  webpKb: number;
  avifKb: number;
  width: number;
  height: number;
  manualCheck: string;
}

async function load(): Promise<Candidate[] | null> {
  try {
    const file = path.join(process.cwd(), "public/photo-candidates/candidates.json");
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

export default async function PhotoReviewPage() {
  const all = await load();

  if (!all) {
    return (
      <Container className="py-32">
        <h1 className="text-4xl">No photo candidates yet</h1>
        <p className="mt-4 max-w-2xl text-lg">
          Add <code>UNSPLASH_ACCESS_KEY</code> and/or <code>PEXELS_API_KEY</code> to <code>.env.local</code>, then run{" "}
          <code>node scripts/fetch-photos.mjs</code>. The candidates will appear here.
        </p>
      </Container>
    );
  }

  const slots = [...new Set(all.map((c) => c.slot))];
  const bands = ["hero"];

  return (
    <Container className="py-28">
      <h1 className="text-4xl">Photo review</h1>
      <p className="mt-3 max-w-3xl text-lg">
        Pick one candidate per slot (e.g. “home-hero: 2, logbook: 1 …”). Check every image for readable number plates and third-party logos before
        approving — these are not auto-detected. Hero and band slots are previewed under the navy overlay.
      </p>

      <div className="mt-12 space-y-16">
        {slots.map((slot) => {
          const items = all.filter((c) => c.slot === slot);
          return (
            <section key={slot} aria-labelledby={`s-${slot}`}>
              <h2 id={`s-${slot}`} className="text-3xl">
                {slot}
              </h2>
              <p className="text-sm text-muted">
                {items[0].used} · {items[0].format} {items[0].width}×{items[0].height}
              </p>
              <ul className="mt-5 grid gap-6 lg:grid-cols-3">
                {items.map((c) => {
                  const src = `/photo-candidates/${c.slot}/${c.n}.webp`;
                  return (
                    <li key={c.n} className="rounded-2xl border border-line bg-white p-4 shadow-soft">
                      <p className="mb-2 text-sm font-semibold text-ink">Option {c.n}</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={c.description || `${c.slot} candidate ${c.n}`} className="w-full rounded-lg" loading="lazy" />
                      {bands.includes(c.format) && (
                        <div className="relative mt-3 overflow-hidden rounded-lg">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt="" className="w-full" loading="lazy" />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(90deg, rgba(11,16,80,.92), rgba(11,16,80,.55))" }}
                          />
                          <p className="absolute inset-0 flex items-center px-5 font-heading text-2xl text-white">Credit that moves you forward.</p>
                        </div>
                      )}
                      <dl className="mt-3 space-y-1 text-sm text-body">
                        <div>
                          <dt className="inline font-semibold text-ink">Source: </dt>
                          <dd className="inline">
                            <a href={c.pageUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                              {c.source}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-ink">Photographer: </dt>
                          <dd className="inline">
                            <a href={c.photographerUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                              {c.photographer}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-ink">Licence: </dt>
                          <dd className="inline">{c.licence}</dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-ink">Original: </dt>
                          <dd className="inline">
                            {c.originalWidth}×{c.originalHeight}
                          </dd>
                        </div>
                        <div>
                          <dt className="inline font-semibold text-ink">Size: </dt>
                          <dd className="inline">
                            {c.webpKb} KB WebP · {c.avifKb} KB AVIF
                          </dd>
                        </div>
                        {c.description && <p className="pt-1 text-xs text-muted">{c.description}</p>}
                      </dl>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
