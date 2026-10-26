/**
 * Single source of truth for all site copy, products, team and contact details.
 * Components read from here — no hard-coded copy in components.
 * Anything marked TODO(client) is unknown and must not be invented.
 */

export type IconName =
  | "car"
  | "user"
  | "graduation-cap"
  | "briefcase"
  | "umbrella"
  | "zap"
  | "eye"
  | "heart"
  | "users"
  | "award"
  | "landmark"
  | "scale"
  | "line-chart"
  | "coins";

export const siteConfig = {
  name: "Anchorstone Capital Limited",
  shortName: "Anchorstone Capital",
  legalName: "Anchorstone Capital Ltd",
  tagline:
    "Logbook loans, personal secured loans, study abroad financing, SME loans and insurance — delivered fast, fairly and transparently.",
  description:
    "Anchorstone Capital Limited is a Nairobi-based credit provider licensed by the Central Bank of Kenya. Logbook loans, personal secured loans, study abroad financing, SME loans and insurance.",
  licenceLine: "Licensed credit provider regulated by the Central Bank of Kenya.",
  // TODO(client): CBK licence number — not rendered until filled.
  licenceNumber: undefined as string | undefined,
  // TODO(deploy): becomes https://anchorstone.com when the domain is live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anchorstone-capital-ltd.vercel.app",
  locale: "en_KE",
  contact: {
    phone: { display: "+254 742 975 497", href: "tel:+254742975497", e164: "+254742975497" },
    // TODO(client): TEMPORARY — becomes info@anchorstone.com once the domain is live.
    email: { display: "info@luminouscrown.co.ke", href: "mailto:info@luminouscrown.co.ke", address: "info@luminouscrown.co.ke" },
    address: {
      street: "Kofisi, Westlands",
      locality: "Nairobi",
      country: "Kenya",
      display: "Kofisi, Westlands, Nairobi, Kenya",
      mapQuery: "Kofisi, Westlands, Nairobi",
    },
    // TODO(client): office hours — not rendered until filled.
    officeHours: undefined as string | undefined,
  },
} as const;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address.mapQuery)}&t=m&z=15&output=embed&iwloc=near`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address.mapQuery)}`;

export const profilePdf = "/brand/Anchorstone_Capital_Company_Profile.pdf";

/* ───────────────────────── Products ───────────────────────── */

export type ProductSlug =
  | "logbook-loan"
  | "personal-secured-loan"
  | "study-abroad-loan"
  | "sme-loan"
  | "insurance";

export interface Product {
  slug: ProductSlug;
  name: string;
  icon: IconName;
  /** Shown in the amount pill. */
  amountLabel: string;
  summary: string;
  intro: string;
  features: string[];
  requirements: string[];
  idealFor: string;
  /** Max loan amount in KES; undefined = no cap shown (Study Abroad). */
  maxAmount?: number;
  /** Max tenure in months for the calculator / form. */
  maxTenureMonths?: number;
  isLoan: boolean;
}

export const products: Product[] = [
  {
    slug: "logbook-loan",
    name: "Logbook Loan",
    icon: "car",
    amountLabel: "Up to KES 700,000",
    summary: "Use your vehicle’s logbook as security and keep driving your car.",
    intro:
      "Unlock the value of your vehicle without giving it up. Our logbook loan uses your car’s logbook as security, so you can access a larger amount quickly while you keep driving as usual.",
    features: [
      "Loans of up to KES 700,000",
      "Keep using your vehicle throughout the loan",
      "Quick valuation and fast approval",
      "Flexible monthly repayment plans",
      "Clear, upfront pricing with no hidden fees",
    ],
    requirements: [
      "Original logbook registered in the applicant’s name",
      "National ID and KRA PIN certificate",
      "Valid comprehensive motor insurance",
      "Vehicle valuation report",
      "6 months’ bank or M-Pesa statements",
    ],
    idealFor: "Car owners, business people and professionals who need a larger amount fast.",
    maxAmount: 700_000,
    maxTenureMonths: 24,
    isLoan: true,
  },
  {
    slug: "personal-secured-loan",
    name: "Personal Secured Loan",
    icon: "user",
    amountLabel: "Up to KES 300,000",
    summary: "Fast credit for salaried individuals with flexible repayment.",
    intro:
      "Cover school fees, emergencies, a big purchase or a personal project with a loan designed for salaried individuals. Approval is fast and repayments are matched to your pay cycle.",
    features: [
      "Loans of up to KES 300,000",
      "Same-day approval for qualifying applicants",
      "Repayments aligned to your salary",
      "Flexible tenures of up to 12 months",
      "Personal support from a dedicated officer",
    ],
    requirements: [
      "National ID and KRA PIN certificate",
      "3 latest payslips",
      "6 months’ bank statement",
      "1-year M-Pesa statement",
    ],
    idealFor: "Employed individuals with a regular, verifiable income.",
    maxAmount: 300_000,
    maxTenureMonths: 12,
    isLoan: true,
  },
  {
    slug: "study-abroad-loan",
    name: "Study Abroad Loan",
    icon: "graduation-cap",
    amountLabel: "Financing tailored to your study plan",
    summary: "Fund tuition, visa and travel costs for studies overseas.",
    intro:
      "Studying overseas is a life-changing investment. Our study abroad loan helps students and their families meet the costs of getting there — structured around your admission, programme and timelines.",
    features: [
      "Covers tuition, visa and travel costs",
      "Amount tailored to your programme",
      "Repayment structured around your family’s income",
      "Guidance through the application process",
      "Fast turnaround to meet admission deadlines",
    ],
    requirements: [
      "Admission or offer letter from the institution",
      "Passport / National ID and KRA PIN",
      "Sponsor’s proof of income",
      "6 months’ bank or M-Pesa statements",
    ],
    idealFor: "Students admitted to institutions abroad and the parents or sponsors supporting them.",
    isLoan: true,
  },
  {
    slug: "sme-loan",
    name: "SME Loan",
    icon: "briefcase",
    amountLabel: "Up to KES 300,000",
    summary: "Working capital for entrepreneurs and small businesses.",
    intro:
      "Restock, take on a new contract or bridge a cash-flow gap. Our SME loan gives entrepreneurs and small business owners quick access to working capital, with repayments shaped around how the business earns.",
    features: [
      "Loans of up to KES 300,000",
      "Funds disbursed in under 24 hours",
      "Repayment plans tailored to your cash flow",
      "Dedicated business support",
      "Option to top up as your business grows",
    ],
    requirements: [
      "Business registration documents",
      "National ID and KRA PIN of the owner(s)",
      "6 months’ bank statement",
      "1-year M-Pesa statement",
      "Business Till or Paybill statements",
    ],
    idealFor: "Small and growing businesses that need flexible working capital.",
    maxAmount: 300_000,
    maxTenureMonths: 12,
    isLoan: true,
  },
  {
    slug: "insurance",
    name: "Insurance",
    icon: "umbrella",
    amountLabel: "Protection arranged through licensed partners",
    summary: "Cover for you, your vehicle, your loan and your business.",
    intro:
      "Every loan is safer when what you own is protected. We help clients put the right cover in place — for their vehicle, their family, their business and their loan — through licensed insurance partners.",
    features: [
      "Motor insurance for financed vehicles",
      "Credit life cover that protects your family",
      "Business and stock cover for SMEs",
      "Health and personal accident cover",
      "Advice on the right level of protection",
    ],
    requirements: [
      "National ID and KRA PIN certificate",
      "Details of the asset or person to be covered",
      "Logbook (for motor cover)",
      "Business registration (for business cover)",
    ],
    idealFor: "Borrowers and businesses who want peace of mind alongside their financing.",
    isLoan: false,
  },
];

export const lendingProducts = products.filter((p) => p.isLoan);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/* ───────────────────────── Company ───────────────────────── */

export const about = {
  lead: "Anchorstone Capital Limited is a private financial institution based in Nairobi, Kenya, licensed by the Central Bank of Kenya as a credit provider.",
  body: [
    "We provide fast, transparent and responsible credit to salaried individuals, students and small businesses. From unlocking the value of a vehicle to funding studies abroad or growing an enterprise, our products are built around one idea: access to finance should be simple, fair and quick.",
    "Our directors bring decades of combined experience in credit and risk management, micro-lending and legal practice — a foundation that lets us move quickly for our clients while lending prudently and ethically.",
  ],
  expertise: [
    { title: "Credit & risk management", icon: "line-chart" },
    { title: "Micro-lending", icon: "coins" },
    { title: "Legal & compliance", icon: "scale" },
  ] satisfies { title: string; icon: IconName }[],
};

export const stats = [
  { value: 42, suffix: " yrs", label: "Combined director experience" },
  { value: 5, suffix: "", label: "Credit & protection products" },
  { value: 700, prefix: "KES ", suffix: "K", label: "Maximum logbook loan" },
];

export const mission =
  "To give individuals and businesses fast, fair and transparent access to credit that helps them grow, study, build and protect what matters to them.";
export const vision =
  "To be Kenya’s most trusted partner for accessible, responsible finance — recognised for speed, integrity and genuine care for every client.";
export const quote = "We lend the way we would want to borrow: clearly, quickly and with respect.";

export const values = [
  { title: "Integrity", text: "We do what we say. Every recommendation and every loan is made in our clients’ best interest." },
  { title: "Transparency", text: "Clear terms, clear costs, no surprises. Clients know exactly what they are signing up for." },
  { title: "Responsible Lending", text: "We lend what clients can comfortably repay, protecting their wellbeing and our book." },
  { title: "Client First", text: "Personal support from application to final repayment, with solutions shaped around real needs." },
];

export const whyUs: { icon: IconName; title: string; text: string }[] = [
  { icon: "zap", title: "Fast decisions", text: "Same-day approvals and quick disbursement so funds arrive when they matter." },
  { icon: "eye", title: "Transparent terms", text: "Simple, upfront pricing with no hidden charges." },
  { icon: "heart", title: "Ethical lending", text: "Affordability checks on every application — we never over-lend." },
  { icon: "users", title: "Personal support", text: "A dedicated team that knows your file and answers your call." },
  { icon: "award", title: "Experienced leadership", text: "42 years of combined director experience in credit, risk and law." },
  { icon: "landmark", title: "Licensed & regulated", text: "A licensed credit provider operating under Central Bank of Kenya rules." },
];

export const steps = [
  {
    title: "Talk to us",
    text: "Call, email or visit our Westlands office. We’ll help you choose the right product and confirm what you qualify for.",
  },
  {
    title: "Submit your documents",
    text: "Share the required documents. Our team reviews your application quickly and keeps you updated.",
  },
  {
    title: "Receive your funds",
    text: "Once approved and accepted, funds are disbursed directly to you — often the same day.",
  },
];

export const speedPromises = {
  approval: "Same-day approval for qualifying applicants",
  disbursement: "Funds disbursed in under 24 hours",
};

/* ───────────────────────── Team ───────────────────────── */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo: { src: string; alt: string; position?: string };
  /** Feature the member in the large leadership layout. */
  featured?: boolean;
  summary: string;
  highlights?: { title: string; org: string; detail: string; current?: boolean }[];
  education?: string[];
  quote?: string;
  tags?: string[];
}

export const team: TeamMember[] = [
  {
    slug: "selestine-mwanga",
    name: "Selestine K. Mwanga",
    role: "CEO & Managing Director",
    featured: true,
    photo: { src: "/brand/team/selestine-mwanga.jpg", alt: "Portrait of Selestine K. Mwanga", position: "center 20%" },
    summary:
      "A seasoned financial and business professional with over 13 years of experience in banking, lending and strategic corporate leadership. Selestine brings deep expertise in credit risk assessment, financial modelling, portfolio growth, lending structures and regulatory compliance — with a track record of guiding organisations to sustainable profitability while balancing growth with ethical stewardship.",
    highlights: [
      {
        title: "CEO & Managing Director",
        org: "Anchorstone Capital Ltd",
        detail: "Leading a lending company focused on transparent, ethical and scalable financial solutions.",
        current: true,
      },
      {
        title: "CEO & Managing Director",
        org: "Jeysell Company Limited",
        detail: "Strategic leadership in real estate and wealth creation.",
      },
      {
        title: "Relationship Manager",
        org: "NCBA Bank & Sidian Bank",
        detail: "Managed client portfolios and delivered tailored financial solutions.",
      },
      {
        title: "Teller & Cash Custodian",
        org: "NIC Bank (now NCBA)",
        detail: "Ensured operational accuracy and compliance.",
      },
      {
        title: "Senior Direct Sales Representative",
        org: "KCB Bank",
        detail: "Drove product uptake and customer acquisition.",
      },
    ],
    education: ["Degree in Economics, University of Nairobi", "Master’s in Strategic Management (in progress)"],
    quote:
      "To position Anchorstone Capital as a trusted partner for investors and clients alike — delivering sustainable returns, responsible lending and community impact.",
  },
  {
    slug: "oltele-lemek",
    name: "Oltele Lemek",
    role: "Director",
    photo: { src: "/brand/team/oltele-lemek.jpg", alt: "Portrait of Oltele Lemek", position: "center 15%" },
    summary:
      "A seasoned financial professional with over 17 years of experience in senior financial management, investment management and strategic advisory. Oltele brings proven expertise in banking, wealth management and relationship management, with deep knowledge of performance-based financing, budget monitoring, financial reporting and investment oversight.",
    tags: [
      "Senior management, KCB Bank",
      "Senior Financial Advisor, SIB",
      "Head of Investment & Wealth Advisory, Moran Capital Management",
      "Licensed investment & wealth advisor (ICIFA)",
    ],
  },
  {
    slug: "oltele-lekilabu",
    // TODO(client): confirm name spelling.
    name: "Oltele G. Lekilabu",
    role: "Mortgage & Real Estate Advisory",
    photo: { src: "/brand/team/oltele-lekilabu.jpg", alt: "Portrait of Oltele G. Lekilabu", position: "center 20%" },
    summary:
      "An experienced mortgage and real estate advisory expert with over 10 years in the real estate and financial sectors. He is proficient in mortgage origination, underwriting and refinancing, with a keen understanding of market trends, regulation and risk across residential and commercial property — helping clients make informed decisions built on trust and transparency.",
    tags: [
      "Mortgage origination & underwriting",
      "Refinancing",
      "Residential & commercial property",
      "Risk & market analysis",
    ],
  },
];

/* ───────────────────────── Partners & media ───────────────────────── */

export interface Partner {
  name: string;
  logo: string;
  url: string;
}
// TODO(client): partner names, logos and URLs. Empty array hides the section.
export const partners: Partner[] = [];

export interface NewsItem {
  title: string;
  date: string;
  summary: string;
  href?: string;
  image?: { src: string; alt: string };
}
// TODO(client): news and events.
export const news: NewsItem[] = [];

/* ───────────────────────── Contact topics ───────────────────────── */

export const contactTopics = [
  { value: "general", label: "General" },
  { value: "logbook-loan", label: "Logbook Loan" },
  { value: "personal-secured-loan", label: "Personal Secured Loan" },
  { value: "study-abroad-loan", label: "Study Abroad Loan" },
  { value: "sme-loan", label: "SME Loan" },
  { value: "insurance", label: "Insurance" },
  { value: "media", label: "Media/Press" },
  { value: "partnership", label: "Partnership" },
] as const;

/* ───────────────────────── Navigation ───────────────────────── */

export const nav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", children: true },
  { label: "About Us", href: "/about-us" },
  { label: "Our Team", href: "/our-team" },
  { label: "Media", href: "/media" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export const applyLink = { label: "Apply Loan", href: "/apply-loan" } as const;
