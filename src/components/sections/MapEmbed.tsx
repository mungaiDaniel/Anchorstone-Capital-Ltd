import { mapsEmbedUrl, siteConfig } from "@/content/site";

/** Lazy-loaded Google Map for the office. */
export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
      <iframe
        src={mapsEmbedUrl}
        title={`Map showing ${siteConfig.contact.address.display}`}
        className="block h-80 w-full sm:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
