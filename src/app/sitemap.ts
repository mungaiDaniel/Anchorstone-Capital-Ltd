import type { MetadataRoute } from "next";
import { products } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/products",
    ...products.map((p) => `/products/${p.slug}`),
    "/about-us",
    "/our-team",
    "/media",
    "/contact-us",
    "/apply-loan",
    "/privacy",
  ];
  return paths.map((p) => ({ url: absoluteUrl(p), changeFrequency: p === "/" ? "weekly" : "monthly", priority: p === "/" ? 1 : 0.7 }));
}
