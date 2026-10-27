import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { Watermark } from "@/components/ui/Watermark";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-[70vh] items-center overflow-hidden bg-linear-to-br from-navy to-brand text-white">
      <Watermark className="top-1/2 -right-10 -translate-y-1/2 lg:right-24" />
      <Container className="relative z-10 pt-40 pb-24">
        <Eyebrow tone="dark">Error 404</Eyebrow>
        <h1 className="mt-5 max-w-2xl text-5xl !text-white sm:text-6xl">We couldn’t find that page</h1>
        <p className="mt-6 max-w-xl text-lg text-on-navy">The page may have moved or the address may be mistyped.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="light" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact-us" variant="ghost-light" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
