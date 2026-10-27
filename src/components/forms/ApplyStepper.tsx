"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2 } from "lucide-react";
import { submitApplication } from "@/app/actions";
import { getProduct, howItWorks, lendingProducts, siteConfig } from "@/content/site";
import {
  COUNTIES,
  DEFAULT_MAX_TENURE,
  EMPLOYMENT_TYPES,
  INCOME_RANGES,
  applySchema,
  initialFormState,
  parseForm,
  type FormErrors,
} from "@/lib/forms/schemas";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Checkbox, Field, FieldError, Honeypot, Select, TextInput } from "./Field";

const STEP_FIELDS: string[][] = [
  ["product", "amount", "tenure"],
  ["name", "nationalId", "phone", "email", "county", "employmentType", "incomeRange"],
  ["consentCredit", "consentPrivacy"],
];
const STEP_TITLES = ["Product & amount", "Your details", "Review & submit"];

const NEXT_STEPS = [
  "We review your application and contact you to confirm what you qualify for.",
  ...howItWorks.slice(2).map((s) => `${s.title}: ${s.text}`),
];

type Props = { initialProduct?: string; initialAmount?: string; initialTenure?: string };

export function ApplyStepper({ initialProduct, initialAmount, initialTenure }: Props) {
  const [state, action, pending] = useActionState(submitApplication, initialFormState);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState(lendingProducts.find((p) => p.slug === initialProduct)?.slug ?? "");
  const [summary, setSummary] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8 shadow-soft sm:p-12">
        <CheckCircle2 aria-hidden="true" className="size-12 text-brand" strokeWidth={1.5} />
        <h2 className="mt-5 text-3xl">Application received</h2>
        {state.reference && (
          <p className="mt-3 text-body">
            Your reference number is <strong className="rounded-md bg-tint px-2 py-0.5 font-mono text-ink">{state.reference}</strong>. Please quote it when you
            contact us.
          </p>
        )}
        <h3 className="mt-8 text-2xl">What happens next</h3>
        <ol className="mt-4 space-y-4">
          {NEXT_STEPS.map((s, i) => (
            <li key={s} className="flex gap-4 text-body">
              <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted">
          Questions? Call{" "}
          <a className="font-semibold text-brand" href={siteConfig.contact.phone.href}>
            {siteConfig.contact.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const errors = { ...state.errors, ...clientErrors };
  const v = state.values ?? {};
  const selected = getProduct(product);
  const maxAmount = selected?.maxAmount;
  const maxTenure = selected?.maxTenureMonths ?? DEFAULT_MAX_TENURE;

  const focusFirstError = () =>
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());

  const validateStep = (index: number): boolean => {
    const form = formRef.current;
    if (!form) return false;
    const result = parseForm(applySchema, new FormData(form));
    const errs: FormErrors = {};
    if (!result.ok) for (const k of STEP_FIELDS[index]) if (result.errors[k]) errs[k] = result.errors[k];
    setClientErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError();
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step === 1 && formRef.current) {
      const snap: Record<string, string> = {};
      new FormData(formRef.current).forEach((val, k) => typeof val === "string" && (snap[k] = val));
      setSummary(snap);
    }
    setStep(step + 1);
    document.getElementById("apply-steps")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const summaryRows: [string, string][] = [
    ["Product", getProduct(summary.product ?? "")?.name ?? "—"],
    ["Amount", summary.amount ? `KES ${Number(summary.amount).toLocaleString("en-US")}` : "—"],
    ["Repayment period", summary.tenure ? `${summary.tenure} months` : "—"],
    ["Full name", summary.name ?? "—"],
    ["National ID", summary.nationalId ?? "—"],
    ["Phone", summary.phone ?? "—"],
    ["Email", summary.email ?? "—"],
    ["County", summary.county ?? "—"],
    ["Employment / business", summary.employmentType ?? "—"],
    ["Monthly income", summary.incomeRange ?? "—"],
  ];

  return (
    <div id="apply-steps" className="grid scroll-mt-28 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
      <aside aria-label="What you need" className="order-2 rounded-2xl bg-tint p-6 sm:p-8 lg:order-1">
        <p className="eyebrow text-brand">Typical requirements</p>
        {selected ? (
          <>
            <h2 className="mt-2 text-2xl">{selected.name}</h2>
            <ul className="mt-5 space-y-3">
              {selected.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-body">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted">Final requirements may vary after assessment.</p>
          </>
        ) : (
          <p className="mt-3 text-body">Choose a product to see the documents you’ll need to have ready.</p>
        )}
      </aside>

      <form
        ref={formRef}
        action={action}
        noValidate
        onSubmit={(e) => {
          const result = parseForm(applySchema, new FormData(e.currentTarget));
          if (!result.ok) {
            e.preventDefault();
            setClientErrors(result.errors);
            const firstStep = STEP_FIELDS.findIndex((fields) => fields.some((f) => result.errors[f]));
            if (firstStep >= 0) setStep(firstStep);
            focusFirstError();
          } else setClientErrors({});
        }}
        className="relative order-1 rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8 lg:order-2"
      >
        <ol aria-label="Progress" className="mb-8 grid grid-cols-3 gap-2">
          {STEP_TITLES.map((t, i) => (
            <li key={t} aria-current={i === step ? "step" : undefined} className="text-center">
              <span
                className={`mx-auto flex size-9 items-center justify-center rounded-full text-sm font-semibold ${
                  i < step ? "bg-brand text-white" : i === step ? "bg-brand text-white ring-4 ring-tint-2" : "bg-tint text-muted"
                }`}
              >
                {i < step ? <Check aria-hidden="true" className="size-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className={`mt-2 block text-xs font-semibold sm:text-sm ${i === step ? "text-ink" : "text-muted"}`}>{t}</span>
            </li>
          ))}
        </ol>

        {state.status === "error" && state.message && (
          <p role="alert" className="mb-5 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {state.message}
          </p>
        )}

        {/* Step 1 */}
        <div hidden={step !== 0} className="space-y-6">
          <h2 className="text-3xl">Product &amp; amount</h2>
          <fieldset aria-describedby={errors.product ? "a-product-error" : undefined}>
            <legend className="text-sm font-semibold text-ink">
              Choose a product<span aria-hidden="true" className="ml-0.5 text-brand">*</span>
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {lendingProducts.map((p) => {
                const checked = product === p.slug;
                return (
                  <label
                    key={p.slug}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-tint-2 ${
                      checked ? "border-brand bg-tint" : "border-line hover:border-brand/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="product"
                      value={p.slug}
                      checked={checked}
                      onChange={() => setProduct(p.slug)}
                      className="sr-only"
                    />
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-soft">
                      <Icon name={p.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">{p.amountLabel}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            <FieldError id="a-product-error" error={errors.product} />
          </fieldset>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="a-amount"
              label="Amount (KES)"
              required
              error={errors.amount}
              hint={selected ? (maxAmount ? `Up to KES ${maxAmount.toLocaleString("en-US")}` : "Tailored to your study plan") : undefined}
            >
              {(a) => <TextInput {...a} name="amount" type="number" inputMode="numeric" min={1000} max={maxAmount} step={1000} defaultValue={v.amount ?? initialAmount} invalid={!!errors.amount} />}
            </Field>
            <Field id="a-tenure" label="Repayment period (months)" required error={errors.tenure} hint={`Up to ${maxTenure} months`}>
              {(a) => <TextInput {...a} name="tenure" type="number" inputMode="numeric" min={1} max={maxTenure} step={1} defaultValue={v.tenure ?? initialTenure} invalid={!!errors.tenure} />}
            </Field>
          </div>
        </div>

        {/* Step 2 */}
        <div hidden={step !== 1} className="space-y-5">
          <h2 className="text-3xl">Your details</h2>
          <Field id="a-name" label="Full name" required error={errors.name}>
            {(a) => <TextInput {...a} name="name" autoComplete="name" defaultValue={v.name} invalid={!!errors.name} />}
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="a-id" label="National ID number" required error={errors.nationalId}>
              {(a) => <TextInput {...a} name="nationalId" inputMode="numeric" autoComplete="off" defaultValue={v.nationalId} invalid={!!errors.nationalId} />}
            </Field>
            <Field id="a-phone" label="Phone" required error={errors.phone} hint="e.g. 0712 345 678">
              {(a) => <TextInput {...a} name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.phone} invalid={!!errors.phone} />}
            </Field>
          </div>
          <Field id="a-email" label="Email" required error={errors.email}>
            {(a) => <TextInput {...a} name="email" type="email" autoComplete="email" defaultValue={v.email} invalid={!!errors.email} />}
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="a-county" label="County" required error={errors.county}>
              {(a) => (
                <Select {...a} name="county" defaultValue={v.county ?? ""} invalid={!!errors.county}>
                  <option value="">Select</option>
                  {COUNTIES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </Select>
              )}
            </Field>
            <Field id="a-employment" label="Employment / business type" required error={errors.employmentType}>
              {(a) => (
                <Select {...a} name="employmentType" defaultValue={v.employmentType ?? ""} invalid={!!errors.employmentType}>
                  <option value="">Select</option>
                  {EMPLOYMENT_TYPES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </Select>
              )}
            </Field>
          </div>
          <Field id="a-income" label="Monthly income range" required error={errors.incomeRange}>
            {(a) => (
              <Select {...a} name="incomeRange" defaultValue={v.incomeRange ?? ""} invalid={!!errors.incomeRange}>
                <option value="">Select</option>
                {INCOME_RANGES.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
            )}
          </Field>
        </div>

        {/* Step 3 */}
        <div hidden={step !== 2} className="space-y-6">
          <h2 className="text-3xl">Review &amp; submit</h2>
          <dl className="divide-y divide-line rounded-xl border border-line text-sm">
            {summaryRows.map(([k, val]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-3 sm:grid-cols-[12rem_1fr]">
                <dt className="font-semibold text-ink">{k}</dt>
                <dd className="break-words text-body">{val}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-4">
            <Checkbox id="a-credit" name="consentCredit" error={errors.consentCredit} defaultChecked={v.consentCredit === "on"}>
              I consent to Anchorstone Capital carrying out a credit check as part of assessing my application.
            </Checkbox>
            <Checkbox id="a-privacy" name="consentPrivacy" error={errors.consentPrivacy} defaultChecked={v.consentPrivacy === "on"}>
              I have read and accept the{" "}
              <Link href="/privacy" target="_blank" className="font-semibold text-brand underline underline-offset-2">
                privacy notice
              </Link>
              .
            </Checkbox>
          </div>
        </div>

        <Honeypot />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              ← Back
            </Button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <Button onClick={goNext}>Continue →</Button>
          ) : (
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? "Submitting…" : "Submit application"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
