import { FieldError, RequiredMark } from "./Field";

type RadioCardsProps<T extends string> = {
  name: string;
  legend: string;
  options: readonly T[];
  value: T | "";
  onChange: (value: T) => void;
  required?: boolean;
  error?: string;
};

/** Radio group rendered as selectable cards (native radios, so arrow keys work). */
export function RadioCards<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  required,
  error,
}: RadioCardsProps<T>) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="font-mono text-sm font-medium text-brand-900">
        {legend}
        {required && <RequiredMark />}
      </legend>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-100 ${
                checked
                  ? "border-brand-600 bg-brand-50 shadow-soft"
                  : "border-line bg-white hover:border-brand-200"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  checked ? "border-brand-700" : "border-brand-200 group-hover:border-brand-400"
                }`}
              >
                <span
                  className={`size-2.5 rounded-full bg-brand-700 transition-transform duration-300 ease-out-expo ${
                    checked ? "scale-100" : "scale-0"
                  }`}
                />
              </span>
              <span className={`text-[0.95rem] ${checked ? "font-medium text-brand-900" : "text-ink-700"}`}>
                {option}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${name}-error`} error={error} />
    </fieldset>
  );
}
