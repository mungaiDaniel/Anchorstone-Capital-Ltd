import type { ReactNode } from "react";
import { legalDraft } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} breadcrumb={[{ label: title }]} />
      <section aria-label={title} className="bg-paper pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          {!legalDraft.reviewed && (
            <p role="note" className="mb-10 rounded-xl border border-line bg-tint px-4 py-3 text-sm text-body">
              Last updated {legalDraft.updated}. This document is being finalised and may change.
            </p>
          )}
          <div className="space-y-10 text-lg leading-relaxed">
            {sections.map((s, i) => (
              <div key={s.title}>
                <h2 className="text-3xl">
                  <span className="mr-3 text-brand/50">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3">{s.body}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
