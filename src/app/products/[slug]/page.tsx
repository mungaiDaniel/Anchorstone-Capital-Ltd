import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getProduct, products, siteConfig } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { NumberedList } from "@/components/ui/NumberedList";
import { Steps } from "@/components/ui/Steps";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/ui/PageHero";
import { getProductImage } from "@/content/images";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApplyButton } from "@/components/modal/ApplyButton";
import { QuickApplyForm } from "@/components/forms/QuickApplyForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const kenyaTitle: Record<string, string> = {
  "logbook-loan": "Logbook Loan in Kenya — up to KES 700,000",
  "personal-secured-loan": "Personal Secured Loan in Nairobi — up to KES 300,000",
  "study-abroad-loan": "Study Abroad Loan in Kenya — Tuition, Visa & Travel",
  "sme-loan": "SME Loan in Kenya — up to KES 300,000",
  insurance: "Insurance Cover in Kenya — Motor, Credit Life & Business",
};

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return pageMetadata({
    title: kenyaTitle[product.slug] ?? product.name,
    description: product.intro,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);
  const applyLabel = product.isLoan ? `Apply for ${product.name}` : "Get a quote";

  const productLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: product.name,
    description: product.intro,
    url: absoluteUrl(`/products/${product.slug}`),
    category: product.isLoan ? "Loan" : "Insurance",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed: { "@type": "Country", name: "Kenya" },
    ...(product.maxAmount ? { amount: { "@type": "MonetaryAmount", currency: "KES", maxValue: product.maxAmount } } : {}),
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          productLd,
          faqLd,
          breadcrumbJsonLd([
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />

      {/* 1. Hero */}
      <PageHero
        image={getProductImage(product.slug)}
        eyebrow={product.categoryTag}
        title={product.name}
        intro={product.tagline}
        breadcrumb={[{ label: "Products", href: "/products" }, { label: product.name }]}
        aside={<IconBadge name={product.icon} tone="dark" size="lg" className="!size-40 [&_svg]:!size-16" />}
      >
        <Pill tone="dark" className="mr-2">
          {product.amountLabel}
        </Pill>
        <ApplyButton preset={{ product: product.slug }} variant="light" size="lg" arrow>
          {applyLabel}
        </ApplyButton>
        <ButtonLink href="/contact-us" variant="ghost-light" size="lg">
          Talk to us
        </ButtonLink>
      </PageHero>

      {/* 2. Intro */}
      <section aria-labelledby="intro-title" className="bg-paper pb-16 sm:pb-20">
        <Container className="max-w-4xl">
          <Reveal>
            <Eyebrow>Overview</Eyebrow>
            <h2 id="intro-title" className="mt-4 text-3xl sm:text-4xl">
              Designed around your goals.
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-ink">{product.intro}</p>
          </Reveal>
        </Container>
      </section>

      {/* 3. What to expect + start application */}
      <section aria-labelledby="expect-title" className="bg-tint py-16 sm:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <Reveal>
            <SectionHeading id="expect-title" eyebrow="What to expect" title="Support from first call to final step." />
            <ul className="mt-8 space-y-4">
              {product.expect.map((e) => (
                <li key={e} className="flex items-start gap-3 text-lg text-ink">
                  <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                  </span>
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl bg-white p-6 shadow-lift sm:p-8">
            <QuickApplyForm preset={{ product: product.slug }} heading="Start your application" headingLevel="h3" />
          </Reveal>
        </Container>
      </section>

      {/* 4. Key features */}
      <section aria-labelledby="features-title" className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading id="features-title" eyebrow="Key features" title="What you get" />
          <StaggerGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <StaggerItem as="li" key={f}>
                <Card className="flex h-full items-start gap-4">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                    <Check aria-hidden="true" className="size-5" strokeWidth={2.5} />
                  </span>
                  <p className="text-ink">{f}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* 5. Typical requirements */}
      <section aria-labelledby="req-title" className="bg-white py-16 sm:py-24">
        <Container className="max-w-4xl">
          <SectionHeading id="req-title" eyebrow="Application checklist" title="Typical requirements" />
          <div className="mt-10">
            <NumberedList items={product.requirements} />
          </div>
          <p className="mt-5 text-sm text-muted">Final requirements may vary after assessment.</p>
        </Container>
      </section>

      {/* 6. How it works */}
      <section aria-labelledby="how-title" className="bg-tint py-16 sm:py-24">
        <Container>
          <SectionHeading id="how-title" eyebrow="How it works" title="Four steps, no surprises." align="center" />
          <div className="mt-14">
            <Steps steps={product.steps} />
          </div>
        </Container>
      </section>

      {/* 7. FAQs */}
      <section aria-labelledby="faq-title" className="bg-paper py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading id="faq-title" eyebrow="FAQs" title={`About the ${product.name}`} />
          <div className="mt-8">
            <Accordion items={product.faqs} />
          </div>
          <p className="mt-6 text-sm">
            More questions?{" "}
            <Link href="/faq" className="font-semibold text-brand hover:underline">
              Read all FAQs
            </Link>
          </p>
        </Container>
      </section>

      {/* 8. Ideal for */}
      <section aria-label="Ideal for" className="bg-paper pb-16 sm:pb-20">
        <Container>
          <Reveal className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:gap-6">
            <p className="eyebrow shrink-0 text-brand">Ideal for</p>
            <p className="text-lg text-ink">{product.idealFor}</p>
          </Reveal>
        </Container>
      </section>

      {/* 9. Related products */}
      <section aria-labelledby="others-title" className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <Eyebrow>Explore more</Eyebrow>
          <h2 id="others-title" className="mt-3 text-3xl">
            Related products
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

      {/* 10. CTA */}
      <div className="bg-paper pt-16 sm:pt-24">
        <CTABand />
      </div>
    </>
  );
}
