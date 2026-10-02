/**
 * Loan products — copy taken from the original Home page (rebranded).
 * Reused by the Home page now and the Apply Loan form later (loan type options).
 */
export type LoanProduct = {
  slug: "personal" | "business" | "top-up";
  /** Short label for tabs, selects and eyebrows. */
  label: string;
  title: string;
  subtitle: string;
  description: string;
  featuresHeading: string;
  features: string[];
  requirements?: string[];
  note?: string;
  /** Headline figures shown as animated stats. */
  highlights: { prefix?: string; value: number; suffix?: string; label: string }[];
  /** `position` = CSS object-position focal point for the cropped frame. */
  image: { src: string; alt: string; position?: string };
  /** Hero slide: headline after "Get up to KES 300,000", plus the speed promise for that product. */
  hero: { headline: string; speed: string; image: { src: string; alt: string } };
};

export const loanProducts: LoanProduct[] = [
  {
    slug: "personal",
    label: "Personal Loans",
    title: "Unsecured Personal Loans",
    subtitle: "Fast Personal Loans in Kenya — No Collateral Required",
    description:
      "Our unsecured personal loans give you access to instant financial support without the need for collateral. Designed for salaried individuals, this loan helps you manage urgent expenses, emergencies, and personal projects with confidence.",
    featuresHeading: "Loan Features",
    features: [
      "Borrow up to KSh 300,000",
      "Same-day approval and disbursement in under 12 hours",
      "No collateral required",
      "Flexible repayment options",
      "Clear and transparent terms",
    ],
    requirements: ["3 latest payslips", "6 months bank statement", "1-year M-Pesa statement"],
    highlights: [
      { prefix: "KSh ", value: 300000, label: "Borrow up to" },
      { prefix: "< ", value: 12, suffix: " hrs", label: "Approval & disbursement" },
    ],
    image: {
      src: "/images/personal-loan-professionals-laptops.webp",
      alt: "Two professional women reviewing work together on their laptops",
    },
    hero: {
      headline: "in Personal Loans",
      speed: "Disbursement in under 12 hours",
      image: {
        src: "/images/hero-personal-loan-professional-laptop.webp",
        alt: "Young professional woman working on her laptop in a bright café",
      },
    },
  },
  {
    slug: "business",
    label: "Business Loans",
    title: "Unsecured Business Loans",
    subtitle: "Grow Your Business with Confidence",
    description:
      "Our unsecured business loans are designed for entrepreneurs and small business owners who need fast working capital without traditional collateral. Whether you’re expanding operations or managing cash flow, Anchorstone Capital supports your growth.",
    featuresHeading: "Loan Features",
    features: [
      "Access up to KSh 300,000",
      "Funds available in under 24 hours",
      "No collateral required",
      "Tailored repayment plans",
      "Dedicated business support",
    ],
    requirements: [
      "Business registration documents",
      "6 months bank statement",
      "1-year M-Pesa statement",
      "Business Till or Paybill statements",
    ],
    note: "We believe in empowering businesses with financing that is responsible, accessible, and reliable.",
    highlights: [
      { prefix: "KSh ", value: 300000, label: "Access up to" },
      { prefix: "< ", value: 24, suffix: " hrs", label: "Funds available" },
    ],
    image: {
      src: "/images/business-loan-shop-owner.webp",
      alt: "Shop owner smiling behind the counter of her well-stocked retail shop",
    },
    hero: {
      headline: "in Unsecured Business Loans",
      speed: "Funds available in under 24 hours",
      image: {
        src: "/images/hero-business-loan-fruit-market-vendor.webp",
        alt: "Vendor arranging fresh fruit at a busy local market stall",
      },
    },
  },
  {
    slug: "top-up",
    label: "Top-Up Loans",
    title: "Top-Up Loans",
    subtitle: "Extra Cash When You Need It Most",
    description:
      "Already have a loan with Anchorstone Capital Ltd? Our top-up loan service allows you to access additional funds on your existing loan quickly and conveniently.",
    featuresHeading: "Top-Up Benefits",
    features: [
      "Get approved in under 1 hour",
      "No need to start a new application",
      "Continue enjoying flexible repayment terms",
      "Subject to eligibility and repayment history",
    ],
    note: "A top-up loan helps you stay financially steady without disrupting your original loan agreement.",
    highlights: [{ prefix: "< ", value: 1, suffix: " hr", label: "To get approved" }],
    image: {
      src: "/images/top-up-loan-man-phone-street.webp",
      position: "36% center",
      alt: "Man checking his phone as he crosses a city street",
    },
    hero: {
      headline: "in Top-Up Loans",
      speed: "Get approved in under 1 hour",
      image: {
        src: "/images/hero-top-up-loan-carpenter-phone.webp",
        alt: "Carpenter in his workshop celebrating good news on his phone",
      },
    },
  },
];

/** "Up to" amount shown in the hero — same figure as the original slider. */
export const maxLoanAmount = 300000;
