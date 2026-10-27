"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { productCategories, products } from "@/content/site";
import { FilterChips } from "@/components/ui/FilterChips";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ButtonLink } from "@/components/ui/Button";
import { ApplyButton } from "@/components/modal/ApplyButton";

const ALL = "All";

/** Filter chips + product grid. The selected category lives in the URL (?category=Vehicle). */
export function ProductsExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const raw = params.get("category");
  const active = productCategories.find((c) => c.toLowerCase() === raw?.toLowerCase()) ?? ALL;
  const visible = active === ALL ? products : products.filter((p) => p.category === active);

  const select = (value: string) => {
    router.replace(value === ALL ? pathname : `${pathname}?category=${value}`, { scroll: false });
  };

  return (
    <div>
      <FilterChips label="Filter products by category" options={[ALL, ...productCategories]} value={active} onChange={select} />
      <p className="sr-only" role="status">
        Showing {visible.length} {visible.length === 1 ? "product" : "products"}
      </p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div className="relative flex h-28 items-center justify-center bg-linear-to-br from-tint to-tint-2">
                <span className="flex size-14 items-center justify-center rounded-full bg-white text-brand shadow-soft">
                  <Icon name={p.icon} className="size-7" />
                </span>
                <Pill tone="outline" className="absolute top-3 left-3 bg-white/80">
                  {p.categoryTag}
                </Pill>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-2xl">{p.name}</h2>
                <p className="mt-2 text-body">{p.summary}</p>
                <Pill className="mt-4">{p.amountLabel}</Pill>
                <div className="mt-5">
                  <p className="eyebrow text-muted">Typical requirements</p>
                  <ul className="mt-3 space-y-2 text-sm text-body">
                    {p.requirements.slice(0, 3).map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {r}
                      </li>
                    ))}
                    {p.requirements.length > 3 && <li className="pl-6 text-muted">and more</li>}
                  </ul>
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  <ButtonLink href={`/products/${p.slug}`} variant="secondary">
                    View product<span className="sr-only"> {p.name}</span>
                  </ButtonLink>
                  {p.isLoan ? (
                    <ApplyButton preset={{ product: p.slug }} arrow>
                      Apply<span className="sr-only"> for {p.name}</span>
                    </ApplyButton>
                  ) : (
                    <ApplyButton preset={{ product: p.slug }} arrow>
                      Get a quote
                    </ApplyButton>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-line p-8 text-center text-body">
          No products in this category. <Link href={pathname} className="font-semibold text-brand">Show all</Link>
        </p>
      )}
    </div>
  );
}
