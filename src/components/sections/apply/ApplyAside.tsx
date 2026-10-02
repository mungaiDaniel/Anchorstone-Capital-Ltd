import Link from "next/link";
import { applySteps } from "@/content/steps";
import { fileFields, type FileFieldKey } from "@/lib/apply/schema";
import { CheckIcon, DocumentIcon } from "@/components/ui/icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

/** Sticky sidebar: documents checklist (derived from the form) + the 3 application steps. */
export function ApplyAside() {
  const documents = (Object.keys(fileFields) as FileFieldKey[]).map((k) => fileFields[k].label);

  return (
    <StaggerGroup className="space-y-6 lg:sticky lg:top-28">
      <StaggerItem className="rounded-[1.75rem] bg-linear-to-br from-brand-800 via-brand-700 to-brand-600 p-7 text-white shadow-lift">
        <p className="eyebrow flex items-center gap-3 text-brand-100">
          <span aria-hidden="true" className="h-px w-6 bg-accent-gold" />
          Before you start
        </p>
        <h2 className="mt-3 text-xl font-semibold text-white">Documents you’ll upload</h2>
        <ul className="mt-5 space-y-3">
          {documents.map((d) => (
            <li key={d} className="flex gap-3 text-sm leading-snug text-brand-50">
              <DocumentIcon className="mt-0.5 size-5 shrink-0 text-accent-gold" />
              {d.replace(/^Upload /, "")}
            </li>
          ))}
          <li className="flex gap-3 text-sm leading-snug text-brand-50">
            <DocumentIcon className="mt-0.5 size-5 shrink-0 text-accent-gold" />
            Your M-Pesa statement password
          </li>
        </ul>
      </StaggerItem>

      <StaggerItem className="rounded-[1.75rem] border border-line bg-white p-7 shadow-soft">
        <p className="eyebrow text-brand-600">How it works</p>
        <ol className="mt-5 space-y-5">
          {applySteps.map((step, i) => (
            <li key={step} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 font-mono text-xs font-semibold text-brand-700"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink-700">{step}</p>
            </li>
          ))}
        </ol>
      </StaggerItem>

      <StaggerItem>
        <Link
          href="/#loan-calculator"
          className="group flex items-center gap-3 rounded-[1.75rem] border border-dashed border-brand-200 px-6 py-5 text-sm text-ink-700 transition hover:border-brand-500 hover:bg-white"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-gold text-brand-950">
            <CheckIcon className="size-4" strokeWidth={2.5} />
          </span>
          <span>
            Not sure how much to borrow?{" "}
            <span className="font-medium text-brand-700 underline underline-offset-2 group-hover:no-underline">
              Use the loan calculator
            </span>
          </span>
        </Link>
      </StaggerItem>
    </StaggerGroup>
  );
}
