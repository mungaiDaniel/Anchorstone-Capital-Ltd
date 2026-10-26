/**
 * Loan calculator settings and maths.
 * Standard reducing-balance amortisation. Figures are indicative only.
 */
import { getProduct, type ProductSlug } from "@/content/site";

// TODO(client): confirm the indicative annual rate per product; 20% p.a. is carried over from the previous calculator.
export const INDICATIVE_ANNUAL_RATE_PCT = 20;

export const CALCULATOR_PRODUCTS = ["logbook-loan", "personal-secured-loan", "sme-loan"] as const satisfies readonly ProductSlug[];
export type CalculatorProduct = (typeof CALCULATOR_PRODUCTS)[number];

export const MIN_AMOUNT = 10_000;
export const AMOUNT_STEP = 5_000;

export function productLimits(slug: CalculatorProduct) {
  const p = getProduct(slug);
  return { maxAmount: p?.maxAmount ?? 300_000, maxTenure: p?.maxTenureMonths ?? 12 };
}

export interface LoanEstimate {
  instalment: number;
  total: number;
  interest: number;
}

/**
 * r = annualRate / 12 / 100
 * instalment = P·r / (1 − (1 + r)^−n)      (P / n when r = 0)
 * total = instalment · n;  interest = total − P
 */
export function calculateLoan(principal: number, months: number, annualRatePct: number): LoanEstimate {
  if (!(principal > 0) || !(months > 0)) return { instalment: 0, total: 0, interest: 0 };
  const r = annualRatePct / 12 / 100;
  const instalment = r === 0 ? principal / months : (principal * r) / (1 - (1 + r) ** -months);
  const total = instalment * months;
  return { instalment, total, interest: total - principal };
}

export const formatKes = (n: number) => `KES ${Math.round(n).toLocaleString("en-US")}`;
