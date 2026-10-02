import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Background photo. Omit for a plain navy hero with a subtle grid pattern. */
  image?: { src: string; alt: string; position?: string };
  /** Breadcrumb trail after "Home"; the last item is the current page. */
  breadcrumb: { label: string; href?: string }[];
  /** Extra bottom space, e.g. when cards overlap the hero's lower edge. */
  overlapBelow?: boolean;
};

/** Compact photo hero for inner pages (Apply Loan, About Us, Our Team, Contact Us). */
export function PageHero({ eyebrow, title, description, image, breadcrumb, overlapBelow = false }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 text-white">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={85}
            sizes="(orientation: portrait) 90vh, 100vw"
            className="-z-20 animate-ken-burns object-cover"
            style={{ objectPosition: image.position ?? "center" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-brand-950/95 via-brand-950/75 to-brand-900/30"
          />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-br from-brand-950 via-brand-900 to-brand-700">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" />
          <div className="absolute -top-24 right-0 size-[28rem] rounded-full bg-brand-500/30 blur-3xl" />
        </div>
      )}

      <Container className={`pt-20 sm:pt-28 ${overlapBelow ? "pb-32 sm:pb-40" : "pb-20 sm:pb-28"}`}>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-xs text-brand-200">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            {breadcrumb.map((item, i) => {
              const current = i === breadcrumb.length - 1;
              return (
                <li key={item.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {item.href && !current ? (
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current={current ? "page" : undefined} className="text-white">
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-10 max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-brand-100">
            <span aria-hidden="true" className="h-px w-8 bg-accent-gold" />
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl leading-[1.1] font-semibold text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">{description}</p>}
        </div>
      </Container>
    </section>
  );
}
