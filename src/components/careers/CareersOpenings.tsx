"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Clock, Building } from "lucide-react";
import { submitCareer } from "@/app/actions";
import { careers, TALENT_POOL } from "@/content/site";
import { CV_MAX_BYTES, careerAreas, careersSchema, initialFormState, parseForm, validateCv, type FormErrors } from "@/lib/forms/schemas";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Honeypot, Select, TextArea, TextInput } from "@/components/forms/Field";

/** Open roles (or the general talent pool) plus the application form; "Apply" preselects the role. */
export function CareersOpenings() {
  const [area, setArea] = useState<string>(TALENT_POOL);
  const [state, action, pending] = useActionState(submitCareer, initialFormState);
  const [clientErrors, setClientErrors] = useState<FormErrors>({});
  const [fileName, setFileName] = useState("");

  const choose = (a: string) => {
    setArea(a);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const errors = { ...state.errors, ...clientErrors };
  const v = state.values ?? {};

  return (
    <>
      <section id="openings" aria-labelledby="openings-title" className="scroll-mt-24 bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading id="openings-title" eyebrow="Open opportunities" title="Where you could fit." />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {careers.roles.length === 0 ? (
              <li className="md:col-span-2">
                <div className="rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-9">
                  <h3 className="text-3xl">{careers.talentPool.title}</h3>
                  <p className="mt-3 max-w-2xl text-body">{careers.talentPool.text}</p>
                  <Button className="mt-6" onClick={() => choose(TALENT_POOL)}>
                    Apply →
                  </Button>
                </div>
              </li>
            ) : (
              careers.roles.map((r) => (
                <li key={r.slug} className="rounded-2xl border border-line bg-white p-7 shadow-soft">
                  <h3 className="text-2xl">{r.title}</h3>
                  <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5"><Building aria-hidden="true" className="size-4" />{r.department}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="size-4" />{r.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock aria-hidden="true" className="size-4" />{r.type}</span>
                  </p>
                  {r.deadline && <p className="mt-2 text-sm font-semibold text-ink">Deadline: {r.deadline}</p>}
                  <p className="mt-3 text-body">{r.summary}</p>
                  <Button className="mt-5" onClick={() => choose(r.title)}>
                    Apply →<span className="sr-only"> for {r.title}</span>
                  </Button>
                </li>
              ))
            )}
          </ul>
        </Container>
      </section>

      <section id="apply" aria-labelledby="apply-title" className="scroll-mt-24 bg-tint py-16 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading id="apply-title" eyebrow="Apply" title="Send your CV." description="Tell us about yourself and attach your CV. We read every application." />

          {state.status === "success" ? (
            <div role="status" className="mt-10 rounded-2xl bg-white p-8 text-center shadow-soft sm:p-12">
              <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-brand" strokeWidth={1.5} />
              <h3 className="mt-5 text-3xl">Thank you — we’ve received your application</h3>
              {state.reference && (
                <p className="mt-3 text-body">
                  Your reference is <strong className="rounded-md bg-tint px-2 py-0.5 font-mono text-ink">{state.reference}</strong>.
                </p>
              )}
            </div>
          ) : (
            <form
              action={action}
              noValidate
              onSubmit={(e) => {
                const fd = new FormData(e.currentTarget);
                const result = parseForm(careersSchema, fd);
                const cvError = validateCv(fd.get("cv") as File | null);
                if (!result.ok || cvError) {
                  e.preventDefault();
                  setClientErrors({ ...(result.ok ? {} : result.errors), ...(cvError ? { cv: cvError } : {}) });
                  const form = e.currentTarget;
                  requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
                } else setClientErrors({});
              }}
              className="relative mt-10 space-y-5 rounded-2xl bg-white p-6 shadow-soft sm:p-8"
            >
              {state.status === "error" && state.message && (
                <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                  {state.message}
                </p>
              )}
              <Field id="cr-name" label="Full name" required error={errors.name}>
                {(a) => <TextInput {...a} name="name" autoComplete="name" defaultValue={v.name} invalid={!!errors.name} />}
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="cr-email" label="Email" required error={errors.email}>
                  {(a) => <TextInput {...a} name="email" type="email" autoComplete="email" defaultValue={v.email} invalid={!!errors.email} />}
                </Field>
                <Field id="cr-phone" label="Phone" required error={errors.phone}>
                  {(a) => <TextInput {...a} name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.phone} invalid={!!errors.phone} />}
                </Field>
              </div>
              <Field id="cr-area" label="Role / area of interest" required error={errors.area}>
                {(a) => (
                  <Select {...a} name="area" value={area} onChange={(e) => setArea(e.target.value)} invalid={!!errors.area}>
                    {careerAreas.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </Select>
                )}
              </Field>
              <Field id="cr-linkedin" label="LinkedIn URL (optional)" error={errors.linkedin}>
                {(a) => <TextInput {...a} name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…" defaultValue={v.linkedin} invalid={!!errors.linkedin} />}
              </Field>
              <Field
                id="cr-cv"
                label="CV"
                required
                error={errors.cv}
                hint={`PDF or DOCX, up to ${CV_MAX_BYTES / 1024 / 1024} MB.${fileName ? ` Selected: ${fileName}` : ""}`}
              >
                {(a) => (
                  <input
                    {...a}
                    name="cv"
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                    className="block w-full rounded-xl border border-line bg-white p-2.5 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-tint file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand"
                  />
                )}
              </Field>
              <Field id="cr-note" label="Short cover note (optional)" error={errors.note} hint="Up to 1,000 characters.">
                {(a) => <TextArea {...a} name="note" maxLength={1000} defaultValue={v.note} invalid={!!errors.note} className="min-h-28" />}
              </Field>
              <Checkbox id="cr-consent" name="consent" error={errors.consent} defaultChecked={v.consent === "on"}>
                I agree that Anchorstone Capital may process my application data for recruitment, as described in the{" "}
                <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2">
                  privacy notice
                </Link>
                .
              </Checkbox>
              <Honeypot />
              <Button type="submit" size="lg" disabled={pending}>
                {pending ? "Sending…" : "Submit application →"}
              </Button>
            </form>
          )}
          <p className="mt-8 text-center text-sm font-semibold text-ink">
            Anchorstone Capital will never ask for payment at any stage of recruitment.
          </p>
        </Container>
      </section>
    </>
  );
}
