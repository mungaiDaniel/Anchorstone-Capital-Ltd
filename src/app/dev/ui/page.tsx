import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Pill } from "@/components/ui/Pill";
import { NumberedList } from "@/components/ui/NumberedList";
import { Steps } from "@/components/ui/Steps";
import { StatBand } from "@/components/ui/StatBand";
import { Accordion } from "@/components/ui/Accordion";
import { FilterChipsDemo } from "./FilterChipsDemo";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/ui/CTABand";
import { Container } from "@/components/ui/Container";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { Watermark } from "@/components/ui/Watermark";
import { howItWorks, products } from "@/content/site";

// Style review page: not indexed and excluded from the sitemap.
export const metadata: Metadata = { title: "UI kit", robots: { index: false, follow: false } };

function Block({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <p className="eyebrow mb-5 text-muted">{name}</p>
      {children}
    </section>
  );
}

export default function UiKitPage() {
  return (
    <>
      <PageHero eyebrow="Design system" title="UI kit" intro="Every shared component, for review." />
      <Container className="pb-20">
        <Block name="Eyebrow + SectionHeading">
          <Eyebrow>Eyebrow label</Eyebrow>
          <SectionHeading eyebrow="Section" title="A section heading" description="With an optional intro paragraph." />
        </Block>
        <Block name="Button">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <ButtonLink href="#" variant="link-arrow" arrow>
              Link arrow
            </ButtonLink>
            <span className="on-dark rounded-xl bg-navy p-4">
              <Button variant="ghost-light">Ghost light</Button>
            </span>
          </div>
        </Block>
        <Block name="Card, IconBadge, Pill">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <IconBadge name="car" />
              <h3 className="mt-4 text-xl">Card title</h3>
              <p className="mt-2">Card body text.</p>
            </Card>
            <Card className="flex items-center gap-3">
              <IconBadge name="user" size="lg" />
              <Pill>Pill</Pill>
              <Pill tone="outline">Outline</Pill>
            </Card>
          </div>
        </Block>
        <Block name="NumberedList">
          <NumberedList items={products[0].requirements} />
        </Block>
        <Block name="Steps">
          <Steps steps={howItWorks} />
        </Block>
        <Block name="Accordion">
          <Accordion items={products[0].faqs} />
        </Block>
        <Block name="FilterChips">
          <FilterChipsDemo />
        </Block>
        <Block name="Watermark + DiagonalDivider">
          <div className="on-dark relative isolate h-56 overflow-hidden bg-navy">
            <Watermark className="top-4 right-4" />
            <DiagonalDivider />
          </div>
        </Block>
      </Container>
      <StatBand tone="dark" />
      <div className="pt-20">
        <CTABand />
      </div>
    </>
  );
}
