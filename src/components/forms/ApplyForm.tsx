"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { submitApplication } from "@/app/actions";
import { getProduct, lendingProducts, steps, siteConfig, type ProductSlug } from "@/content/site";
import {
  COUNTIES,
  DEFAULT_MAX_TENURE,
  EMPLOYMENT_TYPES,
  HEARD_FROM,
  applySchema,
  initialFormState,
  parseForm,
  type FormErrors,
} from "@/lib/forms/schemas";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Select, TextInput } from "./Field";

type Props = { initialProduct?: string; initialAmount?: string; initialTenure?: string };

const NEXT_STEPS = [
  "We review your application and contact you to confirm what you qualify for.",
  ...steps.slice(1).map((s) => `${s.title}: ${s.text}`),
];

export function ApplyForm({ initialProduct, initialAmount, initialTenure }: Props) {
  const [state, action, pending] = useActionState(submitApplication, initialFormState);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});
  const startProduct = lendingProducts.find((p) => p.slug === initialProduct)?.slug ?? "";
  const [product, setProduct] = useState<string>(state.values?.product ?? startProduct);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8 shadow-soft sm:p-12">
        <CheckCircle2 aria-hidden="true" className="size-12 text-brand" strokeWidth={1.5} />
        <h2 className="mt-5 text-3xl">Application received</h2>
        {state.reference && (
          <p className="mt-3 text-body">
            Your reference number is{" "}
            <strong className="rounded-md bg-tint px-2 py-0.5 font-mono text-ink">{state.reference}</strong>. Please
            quote it when you contact us.
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

  const form = (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        const result = parseForm(applySchema, new FormData(e.currentTarget));
        if (!result.ok) {
          e.preventDefault();
          setClientErrors(result.errors);
          requestAnimationFrame(() => document.querySelector<HTMLElement>("form [aria-invalid='true']")?.focus());
        } else setClientErrors({});
      }}
      className="relative space-y-5 rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <h2 className="text-3xl">Your application</h2>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}

      <Field id="a-product" label="Product" required error={errors.product}>
        {(a) => (
          <Select
            {...a}
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value as ProductSlug)}
            invalid={!!errors.product}
          >
            <option value="">Select a product</option>
            {lendingProducts.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </Select>
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="a-amount"
          label="Amount (KES)"
          required
          error={errors.amount}
          hint={selected ? (maxAmount ? `Up to KES ${maxAmount.toLocaleString("en-US")}` : "Tailored to your study plan") : undefined}
        >
          {(a) => (
            <TextInput
              {...a}
              name="amount"
              type="number"
              inputMode="numeric"
              min={1000}
              max={maxAmount}
              step={1000}
              defaultValue={v.amount ?? initialAmount}
              invalid={!!errors.amount}
            />
          )}
        </Field>
        <Field id="a-tenure" label="Repayment period (months)" required error={errors.tenure} hint={`Up to ${maxTenure} months`}>
          {(a) => (
            <TextInput
              {...a}
              name="tenure"
              type="number"
              inputMode="numeric"
              min={1}
              max={maxTenure}
              step={1}
              defaultValue={v.tenure ?? initialTenure}
              invalid={!!errors.tenure}
            />
          )}
        </Field>
      </div>

      <Field id="a-name" label="Full name" required error={errors.name}>
        {(a) => <TextInput {...a} name="name" autoComplete="name" defaultValue={v.name} invalid={!!errors.name} />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="a-id" label="National ID number" required error={errors.nationalId}>
          {(a) => <TextInput {...a} name="nationalId" inputMode="numeric" autoComplete="off" defaultValue={v.nationalId} invalid={!!errors.nationalId} />}
        </Field>
        <Field id="a-phone" label="Phone" required error={errors.phone} hint="e.g. 0712 345 678">
          {(a) => <TextInput {...a} name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} invalid={!!errors.phone} />}
        </Field>
      </div>
      <Field id="a-email" label="Email" required error={errors.email}>
        {(a) => <TextInput {...a} name="email" type="email" autoComplete="email" defaultValue={v.email} invalid={!!errors.email} />}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>
      <Field id="a-heard" label="How did you hear about us?" required error={errors.heardFrom}>
        {(a) => (
          <Select {...a} name="heardFrom" defaultValue={v.heardFrom ?? ""} invalid={!!errors.heardFrom}>
            <option value="">Select</option>
            {HEARD_FROM.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        )}
      </Field>

      <div className="space-y-4 border-t border-line pt-5">
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
      <Honeypot />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
      <aside aria-label="What you need" className="order-2 rounded-2xl bg-tint p-6 sm:p-8 lg:order-1">
        {selected ? (
          <>
            <p className="eyebrow text-brand">What you need</p>
            <h2 className="mt-2 text-2xl">{selected.name}</h2>
            <ul className="mt-5 space-y-3">
              {selected.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-body">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {r}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="eyebrow text-brand">What you need</p>
            <p className="mt-3 text-body">Select a product to see the documents you’ll need to have ready.</p>
          </>
        )}
      </aside>
      <div className="order-1 lg:order-2">{form}</div>
    </div>
  );
}
