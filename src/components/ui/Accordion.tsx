"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  q: string;
  a: string;
}

/** Accessible accordion (button + region). One panel open at a time. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`${uid}-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink hover:bg-tint/60 sm:px-6 sm:py-5"
              >
                {item.q}
                <ChevronDown aria-hidden="true" className={`size-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div
              id={`${uid}-panel-${i}`}
              role="region"
              aria-labelledby={`${uid}-btn-${i}`}
              hidden={!isOpen}
              className="px-5 pb-5 text-body sm:px-6"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
