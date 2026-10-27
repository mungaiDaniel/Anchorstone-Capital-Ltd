import type { MetadataRoute } from "next";
import { products } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about-us",
    "/about-us/vision-mission",
    "/about-us/core-values",
    "/about-us/ceo",
    "/about-us/team",
    "/products",
    ...products.map((p) => `/products/${p.slug}`),
    "/partners",
    "/careers",
    "/media",
    "/faq",
    "/contact-us",
    "/apply-loan",
    "/privacy",
    "/terms",
  ];
  return paths.map((p) => ({ url: absoluteUrl(p), changeFrequency: p === "/" ? "weekly" : "monthly", priority: p === "/" ? 1 : 0.7 }));
}
