"use client";

import { useActionState, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { submitBooking } from "@/app/actions";
import { contactTopics } from "@/content/site";
import { BOOKING_TIMES } from "@/lib/forms/booking";
import { bookingSchema, initialFormState, parseForm, type FormErrors } from "@/lib/forms/schemas";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, FieldError, Honeypot, Select, TextInput } from "./Field";

export type BookingDate = { value: string; weekday: string; day: string; month: string; label: string };

const chip = (selected: boolean) =>
  `flex cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-3 text-center transition peer-focus-visible:ring-4 peer-focus-visible:ring-tint-2 ${
    selected ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40"
  }`;

export function BookingForm({ dates }: { dates: BookingDate[] }) {
  const [state, action, pending] = useActionState(submitBooking, initialFormState);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8 text-center shadow-soft sm:p-12">
        <CalendarCheck aria-hidden="true" className="mx-auto size-12 text-brand" strokeWidth={1.5} />
        <h2 className="mt-5 text-3xl">Appointment requested</h2>
        <p className="mx-auto mt-3 max-w-md text-body">
          We’ll call or email you to confirm your slot. {state.reference && <>Your reference is <strong className="text-ink">{state.reference}</strong>.</>}
        </p>
      </div>
    );
  }

  const errors = { ...state.errors, ...clientErrors };
  const v = state.values ?? {};
  const selDate = date || v.date || "";
  const selTime = time || v.time || "";

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        const result = parseForm(bookingSchema, new FormData(e.currentTarget));
        if (!result.ok) {
          e.preventDefault();
          setClientErrors(result.errors);
          requestAnimationFrame(() => document.querySelector<HTMLElement>("#book-form [aria-invalid='true']")?.focus());
        } else setClientErrors({});
      }}
      id="book-form"
      className="relative space-y-6 rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <h2 className="text-3xl">Book an appointment</h2>
      <p className="text-body">Pick a day and time and we’ll confirm it with you. Times are Nairobi time (EAT), Monday to Friday.</p>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      )}

      <fieldset aria-describedby={errors.date ? "b-date-error" : undefined}>
        <legend className="text-sm font-semibold text-ink">
          Choose a day <span aria-hidden="true" className="text-brand">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {dates.map((d) => (
            <label key={d.value} className="block">
              <input
                type="radio"
                name="date"
                value={d.value}
                checked={selDate === d.value}
                onChange={() => setDate(d.value)}
                aria-label={d.label}
                aria-invalid={errors.date ? true : undefined}
                className="peer sr-only"
              />
              <span className={chip(selDate === d.value)}>
                <span className="text-xs font-semibold uppercase">{d.weekday}</span>
                <span className="text-xl font-semibold">{d.day}</span>
                <span className="text-xs">{d.month}</span>
              </span>
            </label>
          ))}
        </div>
        <FieldError id="b-date-error" error={errors.date} />
      </fieldset>

      <fieldset aria-describedby={errors.time ? "b-time-error" : undefined}>
        <legend className="text-sm font-semibold text-ink">
          Choose a time <span aria-hidden="true" className="text-brand">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {BOOKING_TIMES.map((t) => (
            <label key={t} className="block">
              <input
                type="radio"
                name="time"
                value={t}
                checked={selTime === t}
                onChange={() => setTime(t)}
                aria-invalid={errors.time ? true : undefined}
                className="peer sr-only"
              />
              <span className={chip(selTime === t)}>
                <span className="font-semibold">{t}</span>
              </span>
            </label>
          ))}
        </div>
        <FieldError id="b-time-error" error={errors.time} />
      </fieldset>

      <Field id="b-name" label="Full name" required error={errors.name}>
        {(a) => <TextInput {...a} name="name" autoComplete="name" defaultValue={v.name} invalid={!!errors.name} />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="b-phone" label="Phone" required error={errors.phone} hint="e.g. 0712 345 678">
          {(a) => <TextInput {...a} name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={v.phone} invalid={!!errors.phone} />}
        </Field>
        <Field id="b-email" label="Email" required error={errors.email}>
          {(a) => <TextInput {...a} name="email" type="email" autoComplete="email" defaultValue={v.email} invalid={!!errors.email} />}
        </Field>
      </div>
      <Field id="b-topic" label="What would you like to discuss?" required error={errors.topic}>
        {(a) => (
          <Select {...a} name="topic" defaultValue={v.topic ?? "general"} invalid={!!errors.topic}>
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        )}
      </Field>
      <Checkbox id="b-consent" name="consent" error={errors.consent} defaultChecked={v.consent === "on"}>
        I agree that Anchorstone Capital may contact me about this appointment. See our{" "}
        <a href="/privacy" className="font-semibold text-brand underline underline-offset-2">
          privacy notice
        </a>
        .
      </Checkbox>
      <Honeypot />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Requesting…" : "Request appointment"}
      </Button>
    </form>
  );
}
