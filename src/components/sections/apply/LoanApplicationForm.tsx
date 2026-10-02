"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  acceptAttr,
  emptyApplication,
  employmentStatuses,
  fileFields,
  requiredFields,
  validateApplication,
  type FieldKey,
  type FileFieldKey,
  type LoanApplication,
} from "@/lib/apply/schema";
import { submitLoanApplication } from "@/lib/apply/submit";
import { calculatorConfig } from "@/lib/loan-calculator";
import { Field, TextInput, describedBy } from "@/components/forms/Field";
import { RadioCards } from "@/components/forms/RadioCards";
import { FileDrop } from "@/components/forms/FileDrop";
import { Button, buttonClasses } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";

type TextKey = Exclude<keyof LoanApplication, "files" | "employmentStatus">;

/** Labels for the error summary — key order = on-screen order, so the summary reads top to bottom. */
const labels: Record<FieldKey, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  location: "Your location",
  phone: "Phone number",
  employmentStatus: "Employment status",
  employerName: "Employer / business name",
  jobTitle: "Your job title",
  workLocation: "Location of your workplace / business place",
  buildingFloor: "Building and office floor",
  loanAmount: "Loan amount",
  idDocument: fileFields.idDocument.label,
  photo: fileFields.photo.label,
  payslips: fileFields.payslips.label,
  bankStatement: fileFields.bankStatement.label,
  mpesaStatement: fileFields.mpesaStatement.label,
  mpesaPassword: "M-Pesa statement password",
  referrerName: "Referrer’s name",
};

const { min: minAmount, max: maxAmount } = calculatorConfig.amount;

type LoanApplicationFormProps = {
  /** Optional slot that reads a prefill amount (e.g. from the URL) and reports it via the callback. */
  queryReader?: (onAmount: (amount: string) => void) => ReactNode;
};

export function LoanApplicationForm({ queryReader }: LoanApplicationFormProps) {
  const [values, setValues] = useState<LoanApplication>(() => emptyApplication());

  // Prefill only if the visitor hasn't typed an amount yet.
  const prefillAmount = useCallback(
    (amount: string) => setValues((p) => (p.loanAmount ? p : { ...p, loanAmount: amount })),
    [],
  );
  const [touched, setTouched] = useState<ReadonlySet<FieldKey>>(new Set());
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const errors = useMemo(() => validateApplication(values), [values]);
  const errorKeys = (Object.keys(labels) as FieldKey[]).filter((k) => errors[k]);
  const shownError = (k: FieldKey) => (submitAttempted || touched.has(k) ? errors[k] : undefined);

  const completed = requiredFields.filter((k) => !errors[k]).length;
  const progress = Math.round((completed / requiredFields.length) * 100);

  const touch = (k: FieldKey) => setTouched((prev) => (prev.has(k) ? prev : new Set(prev).add(k)));
  const setText = (k: TextKey, v: string) => setValues((p) => ({ ...p, [k]: v }));
  const setFiles = (k: FileFieldKey, files: File[]) => {
    setValues((p) => ({ ...p, files: { ...p.files, [k]: files } }));
    touch(k);
  };

  /** Props for a text input bound to `k`. */
  const bind = (k: TextKey, hint?: boolean) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: (e: ChangeEvent<HTMLInputElement>) => setText(k, e.target.value),
    onBlur: () => touch(k),
    invalid: Boolean(shownError(k)),
    "aria-invalid": shownError(k) ? true : undefined,
    "aria-describedby": describedBy(k, hint, shownError(k)),
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    setServerError(null);
    if (errorKeys.length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus("submitting");
    const result = await submitLoanApplication(values);
    if (result.ok) {
      setStatus("success");
      requestAnimationFrame(() => formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else {
      setStatus("idle");
      setServerError(result.message);
    }
  }

  const focusField = (k: FieldKey) => {
    const el = document.getElementById(k);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  };

  return (
    <div ref={formTopRef} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift">
      {queryReader?.(prefillAmount)}
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <SuccessPanel key="success" firstName={values.firstName} />
        ) : (
          <m.div key="form" exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}>
            {/* Header + completion progress */}
            <div className="border-b border-line bg-lavender-50/60 px-6 py-6 sm:px-10">
              <h2 id="application-form-title" className="text-2xl font-semibold sm:text-3xl">
                Fill the form below
              </h2>
              <div className="mt-5 flex items-center gap-4">
                <div
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-lavender-200"
                  role="progressbar"
                  aria-label="Required fields completed"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-linear-to-r from-brand-600 to-brand-400 transition-[width] duration-700 ease-out-expo"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="shrink-0 font-mono text-xs text-ink-600 tabular-nums">
                  {completed}/{requiredFields.length} required
                </p>
              </div>
            </div>

            <form noValidate onSubmit={onSubmit} aria-labelledby="application-form-title" className="px-6 py-8 sm:px-10 sm:py-10">
              <p className="text-sm text-ink-500">
                Fields marked <span className="text-accent-orange">*</span> are required.
              </p>

              {/* Error summary */}
              {submitAttempted && errorKeys.length > 0 && (
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  aria-labelledby="error-summary-title"
                  className="mt-6 scroll-mt-28 rounded-2xl border border-danger/30 bg-danger/5 p-5 outline-none focus-visible:ring-4 focus-visible:ring-danger/15"
                >
                  <p id="error-summary-title" className="font-mono text-sm font-semibold text-danger">
                    Please fix {errorKeys.length} {errorKeys.length === 1 ? "field" : "fields"} before submitting
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {errorKeys.map((k) => (
                      <li key={k}>
                        <a
                          href={`#${k}`}
                          onClick={(e) => {
                            e.preventDefault();
                            focusField(k);
                          }}
                          className="text-danger underline underline-offset-2 hover:no-underline"
                        >
                          {labels[k]}: {errors[k]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 space-y-12">
                <FormSection index={1} title="Personal details">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="firstName" label="First name" required error={shownError("firstName")}>
                      <TextInput {...bind("firstName")} autoComplete="given-name" required />
                    </Field>
                    <Field id="lastName" label="Last name" required error={shownError("lastName")}>
                      <TextInput {...bind("lastName")} autoComplete="family-name" required />
                    </Field>
                  </div>
                  <Field id="email" label="Email" required error={shownError("email")}>
                    <TextInput {...bind("email")} type="email" inputMode="email" autoComplete="email" required />
                  </Field>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="location" label="Your location" error={shownError("location")}>
                      <TextInput {...bind("location")} autoComplete="address-level2" />
                    </Field>
                    <Field
                      id="phone"
                      label="Phone number"
                      hint="Enter your phone number (07** *** ***)"
                      error={shownError("phone")}
                    >
                      <TextInput {...bind("phone", true)} type="tel" inputMode="tel" autoComplete="tel" placeholder="07__ ___ ___" />
                    </Field>
                  </div>
                </FormSection>

                <FormSection index={2} title="Employment">
                  <RadioCards
                    name="employmentStatus"
                    legend="Employment status"
                    options={employmentStatuses}
                    value={values.employmentStatus}
                    onChange={(v) => setValues((p) => ({ ...p, employmentStatus: v }))}
                  />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id="employerName" label="Employer / business name" error={shownError("employerName")}>
                      <TextInput {...bind("employerName")} autoComplete="organization" />
                    </Field>
                    <Field id="jobTitle" label="Your job title" error={shownError("jobTitle")}>
                      <TextInput {...bind("jobTitle")} autoComplete="organization-title" />
                    </Field>
                    <Field
                      id="workLocation"
                      label="Location of your workplace / business place"
                      error={shownError("workLocation")}
                    >
                      <TextInput {...bind("workLocation")} />
                    </Field>
                    <Field id="buildingFloor" label="Building and office floor" error={shownError("buildingFloor")}>
                      <TextInput {...bind("buildingFloor")} />
                    </Field>
                  </div>
                </FormSection>

                <FormSection index={3} title="Loan details">
                  <Field
                    id="loanAmount"
                    label="Loan amount"
                    hint={`Amount between ${minAmount.toLocaleString("en-KE")} and ${maxAmount.toLocaleString("en-KE")}`}
                    error={shownError("loanAmount")}
                    className="sm:max-w-sm"
                  >
                    <TextInput {...bind("loanAmount", true)} prefix="KES" inputMode="numeric" autoComplete="off" />
                  </Field>
                </FormSection>

                <FormSection index={4} title="Documents">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {(Object.keys(fileFields) as FileFieldKey[]).map((k) => (
                      <FileDrop
                        key={k}
                        id={k}
                        label={fileFields[k].label}
                        hint={fileFields[k].hint}
                        accept={acceptAttr(fileFields[k].types)}
                        maxFiles={fileFields[k].maxFiles}
                        required={fileFields[k].required}
                        files={values.files[k]}
                        onChange={(files) => setFiles(k, files)}
                        error={shownError(k)}
                      />
                    ))}
                  </div>
                </FormSection>

                <FormSection index={5} title="Final details">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="mpesaPassword"
                      label="M-Pesa statement password"
                      required
                      hint="The password that opens your M-Pesa statement PDF"
                      error={shownError("mpesaPassword")}
                    >
                      <TextInput {...bind("mpesaPassword", true)} inputMode="numeric" autoComplete="off" required />
                    </Field>
                    <Field id="referrerName" label="Referrer’s name" required error={shownError("referrerName")}>
                      <TextInput {...bind("referrerName")} autoComplete="off" required />
                    </Field>
                  </div>
                </FormSection>
              </div>

              {serverError && (
                <p role="alert" className="mt-8 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
                  {serverError}
                </p>
              )}

              <div className="mt-10 border-t border-line pt-8">
                <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
                  {status === "submitting" ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      />
                      Submitting…
                    </>
                  ) : (
                    "Submit application"
                  )}
                </Button>
                <p aria-live="polite" className="sr-only">
                  {status === "submitting" ? "Submitting your application" : ""}
                </p>
              </div>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormSection({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  const id = `form-section-${index}`;
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="flex items-center gap-3 text-lg font-semibold">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-700 font-mono text-sm text-white">
          {index}
        </span>
        {title}
      </h3>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function SuccessPanel({ firstName }: { firstName: string }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center px-6 py-20 text-center sm:px-10"
      role="status"
    >
      <m.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
        className="flex size-20 items-center justify-center rounded-full bg-brand-700 text-white shadow-lift ring-8 ring-brand-50"
      >
        <CheckIcon className="size-10" strokeWidth={2.25} />
      </m.span>
      <h2 className="mt-8 text-3xl font-semibold">Application submitted</h2>
      {/* TODO(content): confirmation message / next steps from the client */}
      <p className="mt-4 max-w-md text-lg leading-relaxed">
        Thank you{firstName.trim() ? `, ${firstName.trim()}` : ""}. We have received your loan application.
      </p>
      <Link href="/" className={buttonClasses({ variant: "secondary", className: "mt-10" })}>
        Back to home
      </Link>
    </m.div>
  );
}
