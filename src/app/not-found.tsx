import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { applyLink } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="We couldn’t find that page"
        description="The page may have moved when our website was updated."
        breadcrumb={[{ label: "Page not found" }]}
      />
      <Container className="flex flex-wrap gap-3 py-16">
        <ButtonLink href="/" arrow>
          Back to home
        </ButtonLink>
        <ButtonLink href={applyLink.href} variant="secondary">
          {applyLink.label}
        </ButtonLink>
      </Container>
    </>
  );
}
