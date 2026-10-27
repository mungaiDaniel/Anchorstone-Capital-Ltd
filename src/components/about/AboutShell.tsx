import Link from "next/link";
import type { ReactNode } from "react";
import { aboutTabs } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/ui/CTABand";

/** Shared layout for the About section: hero + sub-navigation tabs + content + CTA band. */
export function AboutShell({
  current,
  eyebrow,
  title,
  intro,
  breadcrumbLabel,
  children,
}: {
  /** href of the active tab. */
  current: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  breadcrumbLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        breadcrumb={[{ label: "About Us", href: "/about-us" }, ...(current === "/about-us" ? [] : [{ label: breadcrumbLabel }])]}
      />
      <nav aria-label="About sections" className="border-b border-line bg-paper">
        <Container>
          <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
            {aboutTabs.map((t) => {
              const active = t.href === current;
              return (
                <li key={t.href} className="shrink-0">
                  <Link
                    href={t.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-[10px] px-4 py-2.5 text-sm font-semibold transition-colors ${
                      active ? "bg-brand text-white" : "text-body hover:bg-tint hover:text-brand"
                    }`}
                  >
                    {t.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>
      {children}
      <div className="pt-20 sm:pt-28">
        <CTABand />
      </div>
    </>
  );
}
