"use client";

import { useState } from "react";
import { contact, mapsEmbedUrl, mapsLinkUrl } from "@/lib/site";
import { MapPinIcon } from "@/components/ui/icons";

/**
 * Click-to-load Google Map. The iframe (≈1 MB, third-party cookies) is only
 * requested when the visitor asks for it, keeping the page fast and private.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative isolate h-full min-h-80 overflow-hidden rounded-[2rem] border border-line bg-brand-900 shadow-soft">
      {loaded ? (
        <iframe
          src={mapsEmbedUrl}
          title={`Map showing ${contact.address.display}, ${contact.address.locality}`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          {/* Stylised placeholder: grid "streets" + pulsing pin */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-br from-brand-900 via-brand-800 to-brand-600">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-size-[40px_40px]" />
            <div className="absolute top-1/2 left-0 h-3 w-full -translate-y-8 -rotate-12 bg-white/10" />
            <div className="absolute top-0 left-1/3 h-full w-2.5 rotate-6 bg-white/10" />
          </div>
          <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center text-white">
            <span className="relative flex size-16 items-center justify-center">
              <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-accent-gold/40" />
              <span className="relative flex size-16 items-center justify-center rounded-full bg-accent-gold text-brand-950 shadow-lift">
                <MapPinIcon className="size-7" />
              </span>
            </span>
            <div>
              <p className="font-mono text-xl font-semibold">{contact.address.display}</p>
              <p className="mt-1 text-brand-100">{contact.address.locality}, Kenya</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="inline-flex h-11 items-center rounded-full bg-white px-5 font-mono text-sm font-medium text-brand-800 shadow-soft transition hover:-translate-y-0.5 hover:bg-lavender-100"
              >
                Show map
              </button>
              <a
                href={mapsLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 font-mono text-sm font-medium text-white transition hover:bg-white/10"
              >
                Open in Google Maps<span className="sr-only"> (new tab)</span>
              </a>
            </div>
            <p className="max-w-xs text-xs text-brand-200">Loading the map shares data with Google.</p>
          </div>
        </>
      )}
    </div>
  );
}
