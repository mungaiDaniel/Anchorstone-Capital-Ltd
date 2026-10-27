"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { faqCategories, faqs, type FaqCategory } from "@/content/site";
import { Accordion } from "@/components/ui/Accordion";

/** Category tabs (WAI-ARIA tablist with arrow-key navigation) over accordion lists. */
export function FaqTabs() {
  const uid = useId();
  const categories = faqCategories.filter((c) => faqs.some((f) => f.category === c));
  const [active, setActive] = useState<FaqCategory>(categories[0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = categories.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(categories[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="FAQ categories" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {categories.map((c, i) => {
          const selected = c === active;
          return (
            <button
              key={c}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(c)}
              onKeyDown={(e) => onKey(e, i)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                selected ? "border-brand bg-brand text-white" : "border-line bg-white text-body hover:border-brand/50 hover:text-brand"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {categories.map((c, i) => (
        <div key={c} role="tabpanel" id={`${uid}-panel-${i}`} aria-labelledby={`${uid}-tab-${i}`} hidden={c !== active} className="mt-6">
          {c === active && <Accordion key={c} items={faqs.filter((f) => f.category === c)} />}
        </div>
      ))}
    </div>
  );
}
