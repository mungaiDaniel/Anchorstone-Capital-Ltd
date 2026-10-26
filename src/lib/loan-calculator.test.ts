import { describe, expect, it } from "vitest";
import { calculateLoan, formatKes, productLimits } from "./loan-calculator";

describe("calculateLoan", () => {
  it("handles a zero rate by splitting the principal evenly", () => {
    const e = calculateLoan(12_000, 12, 0);
    expect(e.instalment).toBeCloseTo(1_000, 6);
    expect(e.total).toBeCloseTo(12_000, 6);
    expect(e.interest).toBeCloseTo(0, 6);
  });

  it("1-month case: KES 5,000 at 20% p.a. costs one month of interest", () => {
    const e = calculateLoan(5_000, 1, 20);
    const r = 20 / 12 / 100;
    expect(e.instalment).toBeCloseTo(5_000 * (1 + r), 6);
    expect(Math.round(e.interest)).toBe(83);
    expect(Math.round(e.total)).toBe(5_083);
  });

  it("uses reducing-balance amortisation over several months", () => {
    const e = calculateLoan(100_000, 12, 12);
    // 1% monthly, 12 months → 8,884.88 per month
    expect(e.instalment).toBeCloseTo(8_884.88, 2);
    expect(e.total).toBeCloseTo(e.instalment * 12, 6);
    expect(e.interest).toBeCloseTo(e.total - 100_000, 6);
  });

  it("returns zeros for invalid input", () => {
    expect(calculateLoan(0, 6, 20)).toEqual({ instalment: 0, total: 0, interest: 0 });
    expect(calculateLoan(5_000, 0, 20)).toEqual({ instalment: 0, total: 0, interest: 0 });
  });
});

describe("formatKes", () => {
  it("formats as KES with thousands separators", () => {
    expect(formatKes(12_345)).toBe("KES 12,345");
    expect(formatKes(700_000)).toBe("KES 700,000");
  });
});

describe("productLimits", () => {
  it("uses the product caps from the content file", () => {
    expect(productLimits("logbook-loan")).toEqual({ maxAmount: 700_000, maxTenure: 24 });
    expect(productLimits("personal-secured-loan")).toEqual({ maxAmount: 300_000, maxTenure: 12 });
    expect(productLimits("sme-loan")).toEqual({ maxAmount: 300_000, maxTenure: 12 });
  });
});
