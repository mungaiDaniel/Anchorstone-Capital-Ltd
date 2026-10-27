"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Watermark } from "@/components/ui/Watermark";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="on-dark relative isolate flex min-h-[70vh] items-center overflow-hidden bg-linear-to-br from-navy to-brand text-white">
      <Watermark className="top-1/2 -right-10 -translate-y-1/2 lg:right-24" />
      <Container className="relative z-10 py-24">
        <Eyebrow tone="dark">Something went wrong</Eyebrow>
        <h1 className="mt-5 max-w-2xl text-5xl !text-white sm:text-6xl">We hit a snag</h1>
        <p className="mt-6 max-w-xl text-lg text-on-navy">Please try again. If it keeps happening, call or email us and we’ll help.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button variant="light" size="lg" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/contact-us" variant="ghost-light" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
