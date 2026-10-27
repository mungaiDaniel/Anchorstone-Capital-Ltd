"use client";

/** Toggle chips for filtering. Controlled; each chip is a button with aria-pressed. */
export function FilterChips({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active ? "border-brand bg-brand text-white" : "border-line bg-white text-body hover:border-brand/50 hover:text-brand"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
