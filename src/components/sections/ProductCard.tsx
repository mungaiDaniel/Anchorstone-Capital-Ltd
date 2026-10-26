import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/site";
import { IconBadge } from "@/components/ui/IconBadge";

/** Product card. `large` adds the "Ideal for" line (products overview). */
export function ProductCard({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-7">
      <IconBadge name={product.icon} />
      <h3 className="mt-5 text-2xl">{product.name}</h3>
      <p className="mt-3 text-body">{product.summary}</p>
      {large && (
        <p className="mt-3 text-sm text-muted">
          <span className="font-semibold text-ink">Ideal for: </span>
          {product.idealFor}
        </p>
      )}
      <p className="mt-5 inline-flex w-fit rounded-full bg-tint px-3.5 py-1.5 text-xs font-semibold text-brand">
        {product.amountLabel}
      </p>
      <Link
        href={`/products/${product.slug}`}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand after:absolute after:inset-0 after:rounded-2xl"
      >
        Learn more<span className="sr-only"> about {product.name}</span>
        <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
