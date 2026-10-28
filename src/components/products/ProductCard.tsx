import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { SitePhoto } from "@/components/ui/SitePhoto";
import { getProductImage } from "@/content/images";

/** Home-page product card: icon header panel, category tag, name, one line, amount pill, "Learn more →". */
export function ProductCard({ product }: { product: Product }) {
  const image = getProductImage(product.slug);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift">
      <div className={`relative flex items-center justify-center bg-linear-to-br from-tint to-tint-2 ${image ? "aspect-[4/3]" : "h-32"}`}>
        {image ? (
          <SitePhoto image={image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-full bg-white text-brand shadow-soft">
            <Icon name={product.icon} className="size-8" />
          </span>
        )}
        <Pill tone="outline" className="absolute top-3 left-3 bg-white/80">
          {product.categoryTag}
        </Pill>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl">{product.name}</h3>
        <p className="mt-2 text-body">{product.summary}</p>
        <Pill className="mt-4">{product.amountLabel}</Pill>
        <Link
          href={`/products/${product.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand after:absolute after:inset-0"
        >
          Learn more<span className="sr-only"> about {product.name}</span>
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
