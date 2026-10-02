"use client";

import { useId, useState, type CSSProperties } from "react";
import { applyLink } from "@/lib/site";
import { calculateLoan, calculatorConfig as cfg, formatKes } from "@/lib/loan-calculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

// Formatters live at module level so AnimatedNumber's effect isn't re-run every render.
const months = (n: number) => `${n} ${n === 1 ? "Month" : "Months"}`;
const kes = (n: number) => formatKes(n, "KES ");
const ksh = (n: number) => formatKes(n);

export function LoanCalculator() {
  const [amount, setAmount] = useState<number>(cfg.amount.initial);
  const [tenure, setTenure] = useState<number>(cfg.tenure.initial);
  const estimate = calculateLoan(amount, tenure, cfg.annualRatePct);

  // Carry the chosen amount to the Apply Loan form, which prefills its Loan Amount field.
  const applyHref = `${applyLink.href}?amount=${amount}`;

  return (
    <section
      id="loan-calculator"
      aria-labelledby="loan-calculator-title"
      className="scroll-mt-20 bg-white py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="loan-calculator-title"
          eyebrow="Loan calculator"
          title="Calculate Your Loan Here"
          align="center"
        />

        <Reveal
          y={40}
          className="mx-auto mt-14 grid max-w-5xl overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift lg:grid-cols-[1.15fr_1fr]"
        >
          {/* Inputs */}
          <div className="space-y-10 p-7 sm:p-10">
            <RangeField
              label="Loan amount"
              hint="Please specify the amount of loan you require"
              value={amount}
              onChange={setAmount}
              {...cfg.amount}
              format={kes}
              editablePrefix="KES"
            />
            <RangeField
              label="Loan tenure"
              hint="Please specify the loan tenure in years"
              value={tenure}
              onChange={setTenure}
              {...cfg.tenure}
              format={months}
            />
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-sm font-medium text-brand-900">Interest rate</p>
                <p className="rounded-xl bg-lavender-100 px-4 py-2 font-mono text-lg font-semibold text-brand-800">
                  {cfg.annualRatePct}%
                </p>
              </div>
              <p className="mt-3 text-sm text-ink-500">Please specify annual interest rate</p>
            </div>
          </div>

          {/* Results */}
          <div className="relative isolate flex flex-col bg-linear-to-br from-brand-800 via-brand-700 to-brand-600 p-7 text-white sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-brand-400/30 blur-3xl"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="font-mono text-sm text-brand-100">Total repayment</p>
              <p className="mt-2 font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
                <AnimatedNumber value={Math.round(estimate.total)} format={ksh} />
              </p>
              <p className="mt-2 text-sm text-brand-100">Total amount you will repay over full tenure</p>

              <div className="mt-8 divide-y divide-white/15 border-t border-white/15">
                <ResultRow
                  label="Total interest paid"
                  caption="Total interest you will pay over full tenure"
                  value={estimate.interest}
                />
              </div>
            </div>

            <div className="mt-auto pt-10">
              <p className="font-mono text-2xl font-semibold text-white">Ready to apply?</p>
              <p className="mt-2 text-brand-100">Click the button below to apply for a loan.</p>
              <ButtonLink href={applyHref} variant="accent" size="lg" arrow className="mt-6 w-full">
                Apply now
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ResultRow({ label, caption, value }: { label: string; caption: string; value: number }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <p className="font-mono text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-brand-100">{caption}</p>
      </div>
      <p className="font-mono text-lg font-semibold">
        <AnimatedNumber value={Math.round(value)} format={ksh} />
      </p>
    </div>
  );
}

type RangeFieldProps = {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  /** Show a typeable number box (with this prefix) instead of a read-only value. */
  editablePrefix?: string;
};

function RangeField({ label, hint, value, onChange, min, max, step, format, editablePrefix }: RangeFieldProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="font-mono text-sm font-medium text-brand-900">
          {label}
        </label>
        {editablePrefix ? (
          <NumberBox
            label={label}
            prefix={editablePrefix}
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            format={format}
          />
        ) : (
          <output
            htmlFor={id}
            className="rounded-xl bg-lavender-100 px-4 py-2 font-mono text-lg font-semibold text-brand-800 tabular-nums"
          >
            {format(value)}
          </output>
        )}
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={`${id}-hint`}
        aria-valuetext={format(value)}
        className="range mt-5"
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <div className="mt-2 flex justify-between font-mono text-xs text-ink-500">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
      <p id={`${id}-hint`} className="mt-3 text-sm text-ink-500">
        {hint}
      </p>
    </div>
  );
}

type NumberBoxProps = {
  label: string;
  prefix: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  format: (n: number) => string;
};

/**
 * Typeable amount. Valid in-range values update the result live while typing;
 * on blur / Enter the value is clamped into range and re-formatted.
 */
function NumberBox({ label, prefix, value, min, max, onChange, format }: NumberBoxProps) {
  const errorId = useId();
  const [draft, setDraft] = useState<string | null>(null); // null = not editing
  const parse = (raw: string) => Number(raw.replace(/[^\d]/g, ""));
  const draftValue = draft === null ? value : parse(draft);
  const outOfRange = draft !== null && (draftValue < min || draftValue > max);

  const commit = () => {
    if (draft === null) return;
    const n = parse(draft);
    onChange(Math.min(max, Math.max(min, n || min)));
    setDraft(null);
  };

  return (
    <div className="flex flex-col items-end">
      <label className="flex cursor-text items-center gap-1.5 rounded-xl bg-lavender-100 px-4 py-2 font-mono text-lg font-semibold text-brand-800 ring-brand-500 transition focus-within:bg-white focus-within:ring-2">
        <span aria-hidden="true">{prefix}</span>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-label={`${label} in ${prefix}`}
          aria-invalid={outOfRange || undefined}
          aria-describedby={outOfRange ? errorId : undefined}
          value={draft ?? value.toLocaleString("en-KE")}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => {
            const raw = e.target.value;
            setDraft(raw);
            const n = parse(raw);
            if (n >= min && n <= max) onChange(n);
          }}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          className="w-[7.5ch] bg-transparent text-right tabular-nums outline-none focus-visible:outline-none"
        />
      </label>
      {outOfRange && (
        <p id={errorId} className="mt-1.5 text-xs text-accent-orange">
          Enter {format(min)} – {format(max)}
        </p>
      )}
    </div>
  );
}
