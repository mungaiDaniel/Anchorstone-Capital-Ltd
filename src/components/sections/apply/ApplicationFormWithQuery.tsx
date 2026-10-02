"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { calculatorConfig } from "@/lib/loan-calculator";
import { LoanApplicationForm } from "./LoanApplicationForm";

/** Reads ?amount= (sent by the Home page calculator) and reports it once. Renders nothing. */
function AmountFromQuery({ onAmount }: { onAmount: (amount: string) => void }) {
  const raw = Number(useSearchParams().get("amount"));
  const { min, max } = calculatorConfig.amount;
  const valid = Number.isFinite(raw) && raw >= min && raw <= max;

  useEffect(() => {
    if (valid) onAmount(String(Math.round(raw)));
  }, [valid, raw, onAmount]);

  return null;
}

/**
 * The form is prerendered once as static HTML; only the tiny query reader is
 * client-rendered (useSearchParams needs a Suspense boundary on static routes).
 */
export function ApplicationForm() {
  return (
    <LoanApplicationForm
      queryReader={(onAmount) => (
        <Suspense fallback={null}>
          <AmountFromQuery onAmount={onAmount} />
        </Suspense>
      )}
    />
  );
}
