import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getProduct, products, siteConfig } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/sections/PageHeader";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const heading = (name: string, max?: number) => (max ? `${name} — up to KES ${max.toLocaleString("en-US")}` : name);

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return pageMetadata({
    title: heading(product.name, product.maxAmount),
    description: product.intro,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const index = products.findIndex((p) => p.slug === product.slug);
  const others = products.filter((p) => p.slug !== product.slug);
  const cta = product.isLoan
    ? { label: "Apply for this loan", href: `/apply-loan?product=${product.slug}` }
    : { label: "Request a quote", href: "/contact-us?topic=insurance" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: product.name,
    description: product.intro,
    url: absoluteUrl(`/products/${product.slug}`),
    category: product.isLoan ? "Loan" : "Insurance",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: { "@type": "Country", name: "Kenya" },
    ...(product.maxAmount
      ? { amount: { "@type": "MonetaryAmount", currency: "KES", maxValue: product.maxAmount } }
      : {}),
  };

  return (
    <>
      <JsonLd
        data={[
          jsonLd,
          breadcrumbJsonLd([
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow={`Our Products · ${String(index + 1).padStart(2, "0")}`}
        title={product.name}
        aside={<IconBadge name={product.icon} tone="dark" size="lg" className="!size-40 [&_svg]:!size-16" />}
      >
        <p className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25">
          {product.amountLabel}
        </p>
      </PageHeader>

      <section className="bg-paper pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <p className="max-w-3xl text-xl leading-relaxed text-ink">{product.intro}</p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-3xl">Key features</h2>
              <ul className="mt-6 space-y-4">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-body">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl bg-tint p-7 sm:p-9">
              <h2 className="text-3xl">What you need</h2>
              <ul className="mt-6 space-y-3">
                {product.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3 border-b border-tint-2 pb-3 text-body last:border-0 last:pb-0">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-10 flex flex-col gap-2 rounded-2xl border border-line bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:gap-6">
            <p className="eyebrow shrink-0 text-brand">Ideal for</p>
            <p className="text-lg text-ink">{product.idealFor}</p>
          </Reveal>

          <Reveal className="mt-10 text-center">
            <ButtonLink href={cta.href} size="lg" arrow>
              {cta.label}
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="others-title" className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <Eyebrow>Explore more</Eyebrow>
          <h2 id="others-title" className="mt-3 text-3xl">
            Other products
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-paper p-4 transition hover:border-brand/40 hover:shadow-soft"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                    <Icon name={p.icon} className="size-5" />
                  </span>
                  <span className="flex-1 font-semibold text-ink">{p.name}</span>
                  <ArrowRight aria-hidden="true" className="size-4 text-brand transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
