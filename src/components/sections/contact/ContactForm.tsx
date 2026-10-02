"use client";

import { AnimatePresence, m } from "motion/react";
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  emptyContactMessage,
  validateContact,
  type ContactField,
  type ContactMessage,
} from "@/lib/contact/schema";
import { submitContactMessage } from "@/lib/contact/submit";
import { Field, TextArea, TextInput, describedBy } from "@/components/forms/Field";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

export function ContactForm() {
  const [values, setValues] = useState<ContactMessage>(emptyContactMessage);
  const [touched, setTouched] = useState<ReadonlySet<ContactField>>(new Set());
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = useMemo(() => validateContact(values), [values]);
  const shown = (k: ContactField) => (submitAttempted || touched.has(k) ? errors[k] : undefined);

  const bind = (k: ContactField) => ({
    id: `contact-${k}`,
    name: k,
    value: values[k],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((p) => ({ ...p, [k]: e.target.value })),
    onBlur: () => setTouched((p) => (p.has(k) ? p : new Set(p).add(k))),
    invalid: Boolean(shown(k)),
    "aria-invalid": shown(k) ? true : undefined,
    "aria-describedby": describedBy(`contact-${k}`, undefined, shown(k)),
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    setServerError(null);
    const firstError = (Object.keys(errors) as ContactField[])[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstError}`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitContactMessage(values);
    if (result.ok) setStatus("sent");
    else {
      setStatus("idle");
      setServerError(result.message);
    }
  }

  return (
    <div className="rounded-[2rem] border border-line bg-white p-7 shadow-soft sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <m.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-96 flex-col items-center justify-center text-center"
          >
            <m.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              className="flex size-16 items-center justify-center rounded-full bg-brand-700 text-white ring-8 ring-brand-50"
            >
              <CheckIcon className="size-8" strokeWidth={2.25} />
            </m.span>
            <h3 className="mt-6 text-2xl font-semibold">Message sent</h3>
            {/* TODO(content): client's preferred confirmation text / response time */}
            <p className="mt-3 max-w-sm leading-relaxed">
              Thank you{values.firstName.trim() ? `, ${values.firstName.trim()}` : ""}. We have received your message.
            </p>
            <button
              type="button"
              onClick={() => {
                setValues(emptyContactMessage());
                setTouched(new Set());
                setSubmitAttempted(false);
                setStatus("idle");
              }}
              className="mt-8 font-mono text-sm font-medium text-brand-700 underline underline-offset-4 hover:no-underline"
            >
              Send another message
            </button>
          </m.div>
        ) : (
          <m.div key="form" exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}>
            <h2 id="contact-form-title" className="text-2xl leading-tight font-semibold sm:text-3xl">
              We’d love to hear from you. Send us a message!
            </h2>
            <form
              ref={formRef}
              noValidate
              onSubmit={onSubmit}
              aria-labelledby="contact-form-title"
              className="mt-8 space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="contact-firstName" label="First name" required error={shown("firstName")}>
                  <TextInput {...bind("firstName")} autoComplete="given-name" required />
                </Field>
                <Field id="contact-lastName" label="Last name" required error={shown("lastName")}>
                  <TextInput {...bind("lastName")} autoComplete="family-name" required />
                </Field>
              </div>
              <Field id="contact-email" label="Email" required error={shown("email")}>
                <TextInput {...bind("email")} type="email" inputMode="email" autoComplete="email" required />
              </Field>
              <Field id="contact-subject" label="Subject" error={shown("subject")}>
                <TextInput {...bind("subject")} />
              </Field>
              <Field id="contact-message" label="Comment or message" error={shown("message")}>
                <TextArea {...bind("message")} rows={5} />
              </Field>

              {serverError && (
                <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                  {serverError}
                </p>
              )}

              <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
                {status === "sending" ? (
                  <>
                    <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
