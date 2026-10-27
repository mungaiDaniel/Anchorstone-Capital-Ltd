/** Numbered items: 01, 02, 03… */
export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <li key={item} className="flex items-baseline gap-5 py-4 sm:gap-8 sm:py-5">
          <span aria-hidden="true" className="w-9 shrink-0 font-heading text-3xl text-brand/50">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-lg text-ink">{item}</span>
        </li>
      ))}
    </ol>
  );
}
