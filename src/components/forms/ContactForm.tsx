"use client";

import { useActionState, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitContact } from "@/app/actions";
import { contactTopics } from "@/content/site";
import { contactSchema, initialFormState, parseForm, type FormErrors } from "@/lib/forms/schemas";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Select, TextArea, TextInput } from "./Field";

export function ContactForm({ initialTopic = "general" }: { initialTopic?: string }) {
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8 text-center shadow-soft sm:p-12">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-brand" strokeWidth={1.5} />
        <h2 className="mt-5 text-3xl">Thank you — message received</h2>
        <p className="mx-auto mt-3 max-w-md text-body">
          A member of our team will get back to you shortly. If it’s urgent, please call us.
        </p>
      </div>
    );
  }

  const errors = { ...state.errors, ...clientErrors };
  const v = state.values ?? {};
  const topic = contactTopics.some((t) => t.value === initialTopic) ? initialTopic : "general";

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        const result = parseForm(contactSchema, new FormData(e.currentTarget));
        if (!result.ok) {
          e.preventDefault();
          setClientErrors(result.errors);
          requestAnimationFrame(() => document.querySelector<HTMLElement>("form [aria-invalid='true']")?.focus());
        } else setClientErrors({});
      }}
      className="relative space-y-5 rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <h2 className="text-3xl">Send us a message</h2>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}

      <Field id="c-name" label="Full name" required error={errors.name}>
        {(a) => <TextInput {...a} name="name" autoComplete="name" defaultValue={v.name} invalid={!!errors.name} />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-phone" label="Phone" required error={errors.phone} hint="e.g. 0712 345 678">
          {(a) => <TextInput {...a} name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} invalid={!!errors.phone} />}
        </Field>
        <Field id="c-email" label="Email" required error={errors.email}>
          {(a) => <TextInput {...a} name="email" type="email" autoComplete="email" defaultValue={v.email} invalid={!!errors.email} />}
        </Field>
      </div>
      <Field id="c-topic" label="Topic" required error={errors.topic}>
        {(a) => (
          <Select {...a} name="topic" defaultValue={v.topic ?? topic} invalid={!!errors.topic}>
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Field id="c-message" label="Message" required error={errors.message}>
        {(a) => <TextArea {...a} name="message" defaultValue={v.message} invalid={!!errors.message} />}
      </Field>
      <Checkbox id="c-consent" name="consent" error={errors.consent} defaultChecked={v.consent === "on"}>
        I agree that Anchorstone Capital may contact me about this enquiry. See our{" "}
        <a href="/privacy" className="font-semibold text-brand underline underline-offset-2">
          privacy notice
        </a>
        .
      </Checkbox>
      <Honeypot />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
