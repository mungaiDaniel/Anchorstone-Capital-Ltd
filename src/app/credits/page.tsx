import type { Metadata } from "next";
import { images } from "@/content/images";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Photo credits",
  description: "Credits and licences for the stock photography used on the Anchorstone Capital website.",
  path: "/credits",
});

export default function CreditsPage() {
  const list = Object.values(images);
  return (
    <>
      <PageHero eyebrow="Credits" title="Photo credits" intro="Thank you to the photographers whose work appears on this site." breadcrumb={[{ label: "Photo credits" }]} />
      <section aria-label="Photo credits" className="bg-paper pb-20 sm:pb-28">
        <Container className="max-w-4xl">
          <p className="text-lg">
            People shown in these photographs are models. They are not Anchorstone Capital staff, clients or customers.
          </p>
          <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
            {list.map((img) => (
              <li key={img.slot} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4">
                <span className="font-semibold text-ink">{img.slot}</span>
                <span className="text-sm text-body">
                  <a href={img.credit.pageUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
                    Photo
                  </a>{" "}
                  by{" "}
                  <a href={img.credit.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
                    {img.credit.name}
                  </a>{" "}
                  on {img.credit.source} · {img.credit.licence}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
