"use client";

import { useActionState, useId, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { submitQuickApply } from "@/app/actions";
import { contactTimes } from "@/content/site";
import { initialFormState, parseForm, quickApplySchema, quickProductOptions, type FormErrors } from "@/lib/forms/schemas";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Select, TextInput } from "./Field";

export type QuickApplyPreset = { product?: string; amount?: number | string };

/** "Tell us what you need" call-back form. Used by the loan modal, the home hero card and product pages. */
export function QuickApplyForm({
  preset,
  heading = "Apply for a Loan",
  headingLevel: H = "h2",
  className = "",
  compact = false,
}: {
  preset?: QuickApplyPreset;
  heading?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
  /** Hide the intro line (used inside the modal). */
  compact?: boolean;
}) {
  const uid = useId();
  const [state, action, pending] = useActionState(submitQuickApply, initialFormState);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});

  if (state.status === "success") {
    return (
      <div role="status" className={`text-center ${className}`}>
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-brand" strokeWidth={1.5} />
        <H className="mt-4 text-3xl">Thank you — our team will call you shortly.</H>
        {state.reference && (
          <p className="mt-3 text-body">
            Your reference is <strong className="rounded-md bg-tint px-2 py-0.5 font-mono text-ink">{state.reference}</strong>.
          </p>
        )}
      </div>
    );
  }

  const errors = { ...state.errors, ...clientErrors };
  const v = state.values ?? {};
  const id = (n: string) => `${uid}-${n}`;

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        const result = parseForm(quickApplySchema, new FormData(e.currentTarget));
        if (!result.ok) {
          e.preventDefault();
          setClientErrors(result.errors);
          const form = e.currentTarget;
          requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
        } else setClientErrors({});
      }}
      className={`relative space-y-4 ${className}`}
    >
      <H className="text-3xl">{heading}</H>
      {!compact && <p className="-mt-2 text-sm text-muted">Tell us what you need and we’ll call you back.</p>}
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}

      <Field id={id("name")} label="Full name" required error={errors.name}>
        {(a) => <TextInput {...a} name="name" autoComplete="name" defaultValue={v.name} invalid={!!errors.name} />}
      </Field>
      <Field id={id("phone")} label="Phone" required error={errors.phone}>
        {(a) => (
          <TextInput {...a} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07XX XXX XXX" defaultValue={v.phone} invalid={!!errors.phone} />
        )}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={id("amount")} label="Amount (KES)" required error={errors.amount}>
          {(a) => (
            <TextInput {...a} name="amount" type="number" inputMode="numeric" min={1000} step={1000} defaultValue={v.amount ?? preset?.amount} invalid={!!errors.amount} />
          )}
        </Field>
        <Field id={id("time")} label="Best time to call" required error={errors.contactTime}>
          {(a) => (
            <Select {...a} name="contactTime" defaultValue={v.contactTime ?? ""} invalid={!!errors.contactTime}>
              <option value="">Select</option>
              {contactTimes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          )}
        </Field>
      </div>
      <Field id={id("product")} label="Product" required error={errors.product}>
        {(a) => (
          <Select {...a} name="product" defaultValue={v.product ?? preset?.product ?? ""} invalid={!!errors.product}>
            <option value="">Select a product</option>
            {quickProductOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field id={id("email")} label="Email (optional)" error={errors.email}>
        {(a) => <TextInput {...a} name="email" type="email" autoComplete="email" defaultValue={v.email} invalid={!!errors.email} />}
      </Field>
      <Checkbox id={id("consent")} name="consent" error={errors.consent} defaultChecked={v.consent === "on"}>
        I agree that Anchorstone Capital may contact me about this request. See our{" "}
        <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2">
          privacy notice
        </Link>
        .
      </Checkbox>
      <Honeypot />
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Request a call back →"}
      </Button>
    </form>
  );
}
