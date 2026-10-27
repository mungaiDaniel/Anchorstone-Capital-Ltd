"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { submitPartner } from "@/app/actions";
import { PARTNER_TYPES, initialFormState, parseForm, partnerSchema, type FormErrors } from "@/lib/forms/schemas";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Select, TextArea, TextInput } from "./Field";

export function PartnerForm() {
  const [state, action, pending] = useActionState(submitPartner, initialFormState);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white p-8 text-center shadow-soft sm:p-12">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-brand" strokeWidth={1.5} />
        <h3 className="mt-5 text-3xl">Thank you — we’ll be in touch</h3>
        <p className="mx-auto mt-3 max-w-md text-body">A member of our team will contact you about working together.</p>
      </div>
    );
  }

  const errors = { ...state.errors, ...clientErrors };
  const v = state.values ?? {};

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        const result = parseForm(partnerSchema, new FormData(e.currentTarget));
        if (!result.ok) {
          e.preventDefault();
          setClientErrors(result.errors);
          const form = e.currentTarget;
          requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
        } else setClientErrors({});
      }}
      className="relative space-y-5 rounded-2xl bg-white p-6 shadow-soft sm:p-8"
    >
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}
      <Field id="p-org" label="Organisation" required error={errors.organisation}>
        {(a) => <TextInput {...a} name="organisation" autoComplete="organization" defaultValue={v.organisation} invalid={!!errors.organisation} />}
      </Field>
      <Field id="p-name" label="Contact name" required error={errors.name}>
        {(a) => <TextInput {...a} name="name" autoComplete="name" defaultValue={v.name} invalid={!!errors.name} />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="p-email" label="Email" required error={errors.email}>
          {(a) => <TextInput {...a} name="email" type="email" autoComplete="email" defaultValue={v.email} invalid={!!errors.email} />}
        </Field>
        <Field id="p-phone" label="Phone" required error={errors.phone}>
          {(a) => <TextInput {...a} name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.phone} invalid={!!errors.phone} />}
        </Field>
      </div>
      <Field id="p-type" label="Partner type" required error={errors.partnerType}>
        {(a) => (
          <Select {...a} name="partnerType" defaultValue={v.partnerType ?? ""} invalid={!!errors.partnerType}>
            <option value="">Select</option>
            {PARTNER_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        )}
      </Field>
      <Field id="p-message" label="Message" required error={errors.message}>
        {(a) => <TextArea {...a} name="message" defaultValue={v.message} invalid={!!errors.message} />}
      </Field>
      <Checkbox id="p-consent" name="consent" error={errors.consent} defaultChecked={v.consent === "on"}>
        I agree that Anchorstone Capital may contact me about this enquiry. See our{" "}
        <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2">
          privacy notice
        </Link>
        .
      </Checkbox>
      <Honeypot />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry →"}
      </Button>
    </form>
  );
}
