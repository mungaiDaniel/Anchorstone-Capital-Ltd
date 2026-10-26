"use client";

import { useId, useState, type CSSProperties } from "react";
import { getProduct } from "@/content/site";
import {
  AMOUNT_STEP,
  CALCULATOR_PRODUCTS,
  INDICATIVE_ANNUAL_RATE_PCT,
  MIN_AMOUNT,
  calculateLoan,
  formatKes,
  productLimits,
  type CalculatorProduct,
} from "@/lib/loan-calculator";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const fill = (value: number, min: number, max: number) => ({ "--fill": `${((value - min) / (max - min)) * 100}%` }) as CSSProperties;

export function LoanCalculator() {
  const uid = useId();
  const [product, setProduct] = useState<CalculatorProduct>("personal-secured-loan");
  const [amount, setAmount] = useState(50_000);
  const [tenure, setTenure] = useState(6);

  const { maxAmount, maxTenure } = productLimits(product);
  const estimate = calculateLoan(amount, tenure, INDICATIVE_ANNUAL_RATE_PCT);

  const selectProduct = (slug: CalculatorProduct) => {
    const limits = productLimits(slug);
    setProduct(slug);
    setAmount((a) => Math.min(a, limits.maxAmount));
    setTenure((t) => Math.min(t, limits.maxTenure));
  };

  const query = new URLSearchParams({ product, amount: String(amount), tenure: String(tenure) });

  return (
    <section id="calculator" aria-labelledby="calc-title" className="bg-tint py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="calc-title"
          eyebrow="Loan calculator"
          title="Estimate your repayments"
          description="Choose a product, then adjust the amount and period to see an indicative monthly instalment."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-3xl border border-line bg-white shadow-lift lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-8 p-6 sm:p-10">
            <div>
              <label htmlFor={`${uid}-product`} className="block text-sm font-semibold text-ink">
                Product
              </label>
              <select
                id={`${uid}-product`}
                value={product}
                onChange={(e) => selectProduct(e.target.value as CalculatorProduct)}
                className="mt-2 block h-12 w-full rounded-xl border border-line bg-white px-4 text-ink focus:border-brand focus:ring-4 focus:ring-tint-2 focus:outline-none"
              >
                {CALCULATOR_PRODUCTS.map((slug) => (
                  <option key={slug} value={slug}>
                    {getProduct(slug)?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${uid}-amount`} className="text-sm font-semibold text-ink">
                  Loan amount
                </label>
                <output htmlFor={`${uid}-amount`} className="font-heading text-2xl text-brand">
                  {formatKes(amount)}
                </output>
              </div>
              <input
                id={`${uid}-amount`}
                type="range"
                className="range mt-4"
                min={MIN_AMOUNT}
                max={maxAmount}
                step={AMOUNT_STEP}
                value={amount}
                style={fill(amount, MIN_AMOUNT, maxAmount)}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>{formatKes(MIN_AMOUNT)}</span>
                <span>{formatKes(maxAmount)}</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${uid}-tenure`} className="text-sm font-semibold text-ink">
                  Repayment period
                </label>
                <output htmlFor={`${uid}-tenure`} className="font-heading text-2xl text-brand">
                  {tenure} {tenure === 1 ? "month" : "months"}
                </output>
              </div>
              <input
                id={`${uid}-tenure`}
                type="range"
                className="range mt-4"
                min={1}
                max={maxTenure}
                step={1}
                value={tenure}
                style={fill(tenure, 1, maxTenure)}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>1 month</span>
                <span>{maxTenure} months</span>
              </div>
            </div>
          </div>

          <div className="on-dark flex flex-col justify-between gap-8 bg-navy p-6 text-white sm:p-10">
            <div aria-live="polite">
              <p className="eyebrow text-soft">Monthly instalment</p>
              <p className="mt-2 font-heading text-5xl text-white">{formatKes(estimate.instalment)}</p>
              <dl className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-t border-white/15 pt-4">
                  <dt className="text-soft">Total repayment</dt>
                  <dd className="font-semibold">{formatKes(estimate.total)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-white/15 pt-4">
                  <dt className="text-soft">Total interest</dt>
                  <dd className="font-semibold">{formatKes(estimate.interest)}</dd>
                </div>
              </dl>
            </div>
            <div>
              <ButtonLink href={`/apply-loan?${query.toString()}`} variant="light" size="lg" arrow className="w-full">
                Apply now
              </ButtonLink>
              <p className="mt-4 text-xs leading-relaxed text-soft">
                Figures are indicative. Final terms depend on your application and our credit assessment.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
