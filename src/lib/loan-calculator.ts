/**
 * Loan calculator settings and maths — copied exactly from the original site's
 * Elfsight calculator widget. Change pricing here only.
 */
export const calculatorConfig = {
  amount: { min: 1000, max: 300000, step: 500, initial: 5000 },
  tenure: { min: 1, max: 12, step: 1, initial: 1 },
  annualRatePct: 20,
} as const;

export type LoanEstimate = { total: number; interest: number };

/**
 * Exact formula from the original widget:
 *   instalment = P × (R/1200 × (1 + R/1200)^(T×12)) / ((1 + R/1200)^(T×12) − 1)
 *   total      = instalment × T × 12
 *   interest   = total − P
 * where P = amount, R = annual rate %, T = tenure slider value.
 * e.g. KES 1,000 at tenure 1 → KSh 1,112 total, KSh 112 interest (matches the live site).
 *
 * NOTE: T×12 means the slider value is treated as years, although the slider is
 * labelled in months. Kept as-is to match the live site — TODO(client): confirm.
 */
export function calculateLoan(amount: number, tenure: number, annualRatePct: number): LoanEstimate {
  const r = annualRatePct / 1200;
  const n = tenure * 12;
  const instalment = (amount * (r * (1 + r) ** n)) / ((1 + r) ** n - 1);
  const total = instalment * n;
  return { total, interest: total - amount };
}

export const formatKes = (n: number, prefix = "KSh ") => `${prefix}${Math.round(n).toLocaleString("en-KE")}`;
