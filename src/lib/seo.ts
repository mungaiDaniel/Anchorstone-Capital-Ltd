import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/** Absolute URL for a site path (uses the single SITE_URL from siteConfig). */
export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();

/** Per-page metadata: plain strings only (React escapes them), canonical + OG url from one path. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/brand/logo_full_blue.png"),
  description: siteConfig.description,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone.e164,
    email: siteConfig.contact.email.address,
    contactType: "customer service",
    areaServed: "KE",
    availableLanguage: ["en"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.locality,
    addressCountry: "KE",
  },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
