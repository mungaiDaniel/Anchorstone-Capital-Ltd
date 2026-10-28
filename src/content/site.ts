/**
 * Single source of truth for all site copy, products, team and contact details.
 * Components read from here — no hard-coded copy in components.
 * Anything marked TODO(client) is unknown and must not be invented; sections whose data is empty are hidden.
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
  | "coins"
  | "shield-check"
  | "gauge"
  | "handshake"
  | "building"
  | "sprout"
  | "target"
  | "message-circle";

export const siteConfig = {
  name: "Anchorstone Capital Limited",
  shortName: "Anchorstone Capital",
  legalName: "Anchorstone Capital Ltd",
  tagline:
    "Logbook loans, personal secured loans, study abroad financing, SME loans and insurance — delivered fast, fairly and transparently.",
  motto: "Anchored in trust. Built for progress.",
  closingTagline: "Capital today. Progress tomorrow.",
  description:
    "Anchorstone Capital Limited is a Nairobi-based credit provider licensed by the Central Bank of Kenya. Logbook loans, personal secured loans, study abroad financing, SME loans and insurance.",
  licenceLine: "Licensed credit provider regulated by the Central Bank of Kenya.",
  topBarLicence: "Licensed credit provider · Regulated by the Central Bank of Kenya",
  // TODO(client): CBK licence number — not rendered until filled.
  licenceNumber: undefined as string | undefined,
  // TODO(deploy): becomes https://anchorstone.com when the domain is live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anchorstone-capital-ltd.vercel.app",
  locale: "en_KE",
  contact: {
    phone: { display: "+254 742 975 497", href: "tel:+254742975497", e164: "+254742975497" },
    // TODO(client): TEMPORARY — becomes info@anchorstone.com once the domain is live.
    email: { display: "info@luminouscrown.co.ke", href: "mailto:info@luminouscrown.co.ke", address: "info@luminouscrown.co.ke" },
    // TODO(client): careers mailbox — falls back to the main email.
    careersEmail: undefined as string | undefined,
    // TODO(client): WhatsApp number, international format without "+", e.g. 2547XXXXXXXX. No number = no WhatsApp button.
    whatsapp: undefined as string | undefined,
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
  // TODO(client): social profile URLs — only those filled are rendered.
  socials: {
    facebook: undefined as string | undefined,
    x: undefined as string | undefined,
    linkedin: undefined as string | undefined,
    instagram: undefined as string | undefined,
    youtube: undefined as string | undefined,
  },
} as const;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.address.mapQuery)}&t=m&z=15&output=embed&iwloc=near`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address.mapQuery)}`;

export const profilePdf = "/brand/Anchorstone_Capital_Company_Profile.pdf";

/** WhatsApp deep link, or undefined when no number has been supplied. */
export const whatsappUrl = (text = "Hello Anchorstone Capital, I would like to make an enquiry.") =>
  siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`
    : undefined;

/* ───────────────────────── Products ───────────────────────── */

export type ProductSlug =
  | "logbook-loan"
  | "personal-secured-loan"
  | "study-abroad-loan"
  | "sme-loan"
  | "insurance";

export type ProductCategory = "Personal" | "Vehicle" | "Education" | "Business" | "Protection";
export const productCategories: ProductCategory[] = ["Personal", "Vehicle", "Education", "Business", "Protection"];

export interface Faq {
  q: string;
  a: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface Product {
  slug: ProductSlug;
  name: string;
  icon: IconName;
  category: ProductCategory;
  /** e.g. "Vehicle-backed finance" */
  categoryTag: string;
  tagline: string;
  /** Shown in the amount pill. */
  amountLabel: string;
  summary: string;
  intro: string;
  expect: string[];
  features: string[];
  requirements: string[];
  steps: ProcessStep[];
  faqs: Faq[];
  idealFor: string;
  /** Max loan amount in KES; undefined = no cap shown (Study Abroad). */
  maxAmount?: number;
  /** Max tenure in months for the calculator / form. */
  maxTenureMonths?: number;
  isLoan: boolean;
}

const lendingExpect = [
  "Guidance from a dedicated officer",
  "Clear application requirements",
  "Fair credit and affordability assessment",
  "Transparent documentation and terms",
  "Support until your final repayment",
];

const lendingSteps: ProcessStep[] = [
  { title: "Apply", text: "Tell us what you need online, by phone or at our Westlands office." },
  { title: "Review", text: "An officer reviews your documents and confirms what you can comfortably repay." },
  { title: "Approve", text: "You receive a decision — qualifying applicants can be approved the same day." },
  { title: "Disburse", text: "Once you accept the terms, funds are paid out directly to you." },
];

export const products: Product[] = [
  {
    slug: "logbook-loan",
    name: "Logbook Loan",
    icon: "car",
    category: "Vehicle",
    categoryTag: "Vehicle-backed finance",
    tagline: "Finance your plans with your logbook while you keep driving your car.",
    amountLabel: "Up to KES 700,000",
    summary: "Use your vehicle’s logbook as security and keep driving your car.",
    intro:
      "Unlock the value of your vehicle without giving it up. Our logbook loan uses your car’s logbook as security, so you can access a larger amount quickly while you keep driving as usual.",
    expect: lendingExpect,
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
    steps: lendingSteps,
    faqs: [
      { q: "Can I keep using my car?", a: "Yes. You keep driving your vehicle throughout the loan; the logbook is held as security." },
      {
        q: "How much can I borrow?",
        a: "Up to KES 700,000, depending on the vehicle’s valuation and your ability to repay.",
      },
      {
        q: "How fast is approval?",
        a: "Qualifying applications can be approved the same day once valuation and documents are complete.",
      },
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
    category: "Personal",
    categoryTag: "Salary-based finance",
    tagline: "Fast, fair credit for salaried individuals.",
    amountLabel: "Up to KES 300,000",
    summary: "Fast credit for salaried individuals with flexible repayment.",
    intro:
      "Cover school fees, emergencies, a big purchase or a personal project with a loan designed for salaried individuals. Approval is fast and repayments are matched to your pay cycle.",
    expect: lendingExpect,
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
    steps: lendingSteps,
    faqs: [
      { q: "Who qualifies?", a: "Employed individuals with a regular, verifiable income." },
      { q: "How much can I borrow?", a: "Up to KES 300,000, based on your income and repayment capacity." },
      { q: "How long can I take to repay?", a: "Up to 12 months." },
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
    category: "Education",
    categoryTag: "Education finance",
    tagline: "Fund tuition, visa and travel for studies overseas.",
    amountLabel: "Financing tailored to your study plan",
    summary: "Fund tuition, visa and travel costs for studies overseas.",
    intro:
      "Studying overseas is a life-changing investment. Our study abroad loan helps students and their families meet the costs of getting there — structured around your admission, programme and timelines.",
    expect: lendingExpect,
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
    steps: lendingSteps,
    faqs: [
      { q: "What does it cover?", a: "Tuition, visa and travel costs, tailored to your programme." },
      { q: "Who applies — the student or the sponsor?", a: "Either; the sponsor’s income is assessed." },
      { q: "Is there a maximum amount?", a: "The amount is tailored to your study plan and repayment capacity." },
    ],
    idealFor: "Students admitted to institutions abroad and the parents or sponsors supporting them.",
    isLoan: true,
  },
  {
    slug: "sme-loan",
    name: "SME Loan",
    icon: "briefcase",
    category: "Business",
    categoryTag: "Working capital",
    tagline: "Working capital that keeps your business moving.",
    amountLabel: "Up to KES 300,000",
    summary: "Working capital for entrepreneurs and small businesses.",
    intro:
      "Restock, take on a new contract or bridge a cash-flow gap. Our SME loan gives entrepreneurs and small business owners quick access to working capital, with repayments shaped around how the business earns.",
    expect: lendingExpect,
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
    steps: lendingSteps,
    faqs: [
      {
        q: "What documents do I need?",
        a: "Business registration, ID and KRA PIN of the owner(s), 6 months’ bank statement, 1-year M-Pesa statement and Till/Paybill statements.",
      },
      { q: "How fast are funds disbursed?", a: "In under 24 hours once approved." },
      { q: "Can I top up later?", a: "Yes, subject to your repayment history." },
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
    category: "Protection",
    categoryTag: "Cover & protection",
    tagline: "Protection for you, your vehicle, your loan and your business.",
    amountLabel: "Protection arranged through licensed partners",
    summary: "Cover for you, your vehicle, your loan and your business.",
    intro:
      "Every loan is safer when what you own is protected. We help clients put the right cover in place — for their vehicle, their family, their business and their loan — through licensed insurance partners.",
    expect: [
      "Advice from a dedicated officer",
      "Cover matched to what you need to protect",
      "Cover arranged through licensed insurance partners",
      "Clear explanation of what is and isn’t covered",
      "Guidance until your cover is in place",
    ],
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
    steps: [
      { title: "Enquire", text: "Tell us what you want to protect — a vehicle, a loan, your family or your business." },
      { title: "Assess", text: "We review your needs and the details of the asset or person to be covered." },
      { title: "Quote", text: "You receive a quote from our licensed insurance partners." },
      { title: "Cover", text: "Once you accept, your cover is put in place." },
    ],
    faqs: [
      {
        q: "Which covers do you arrange?",
        a: "Motor, credit life, business and stock, health and personal accident cover through licensed insurance partners.",
      },
      {
        q: "Do I need a loan with you to get cover?",
        a: "No, but we can bundle cover with your financing.",
      },
    ],
    idealFor: "Borrowers and businesses who want peace of mind alongside their financing.",
    isLoan: false,
  },
];

export const lendingProducts = products.filter((p) => p.isLoan);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productProcess: ProcessStep[] = [
  { title: "Choose", text: "Pick the product that fits your goal." },
  { title: "Apply", text: "Tell us what you need — it takes a few minutes." },
  { title: "Assessment", text: "We check affordability and your documents." },
  { title: "Decision", text: "Get a clear answer, often the same day." },
];

/* ───────────────────────── Company ───────────────────────── */

export const about = {
  lead: "Anchorstone Capital Limited is a private financial institution based in Nairobi, Kenya, licensed by the Central Bank of Kenya as a credit provider.",
  body: [
    "We provide fast, transparent and responsible credit to salaried individuals, students and small businesses. From unlocking the value of a vehicle to funding studies abroad or growing an enterprise, our products are built around one idea: access to finance should be simple, fair and quick.",
    "Our directors bring decades of combined experience in credit and risk management, micro-lending and legal practice — a foundation that lets us move quickly for our clients while lending prudently and ethically.",
  ],
  pillars: [
    {
      icon: "users" as IconName,
      title: "Client First",
      text: "Every product and decision starts with what the client actually needs and can comfortably repay.",
    },
    {
      icon: "gauge" as IconName,
      title: "Built for Speed",
      text: "Quick assessments, same-day approvals for qualifying applicants and fast disbursement.",
    },
    {
      icon: "sprout" as IconName,
      title: "Responsible Growth",
      text: "We grow by lending prudently, transparently and within the rules set by the Central Bank of Kenya.",
    },
  ],
  expertise: [
    { title: "Credit & risk management", icon: "line-chart" },
    { title: "Micro-lending", icon: "coins" },
    { title: "Legal & compliance", icon: "scale" },
  ] satisfies { title: string; icon: IconName }[],
  whyWeExist:
    "Access to fair credit changes what people can do: keep a business running, send a child to study abroad, or turn a vehicle into working capital. We exist to make that access simple, fast and honest.",
};

export const directorYears = 42;

export const stats = [
  { value: 42, suffix: " yrs", label: "Combined director experience" },
  { value: 5, suffix: "", label: "Credit & protection products" },
  { value: 700, prefix: "KES ", suffix: "K", label: "Maximum logbook loan" },
  { value: 24, suffix: " hrs", prefix: "≤ ", label: "To disbursement for SME loans" },
];

export const mission =
  "To give individuals and businesses fast, fair and transparent access to credit that helps them grow, study, build and protect what matters to them.";
export const vision =
  "To be Kenya’s most trusted partner for accessible, responsible finance — recognised for speed, integrity and genuine care for every client.";
export const quote = "We lend the way we would want to borrow: clearly, quickly and with respect.";

export const values = [
  { icon: "shield-check" as IconName, title: "Integrity", text: "We do what we say. Every recommendation and every loan is made in our clients’ best interest." },
  { icon: "eye" as IconName, title: "Transparency", text: "Clear terms, clear costs, no surprises. Clients know exactly what they are signing up for." },
  { icon: "scale" as IconName, title: "Responsible Lending", text: "We lend what clients can comfortably repay, protecting their wellbeing and our book." },
  { icon: "heart" as IconName, title: "Client First", text: "Personal support from application to final repayment, with solutions shaped around real needs." },
];

export const whyUs: { icon: IconName; title: string; text: string }[] = [
  { icon: "zap", title: "Fast decisions", text: "Same-day approvals and quick disbursement so funds arrive when they matter." },
  { icon: "eye", title: "Transparent terms", text: "Simple, upfront pricing with no hidden charges." },
  { icon: "heart", title: "Ethical lending", text: "Affordability checks on every application — we never over-lend." },
  { icon: "users", title: "Personal support", text: "A dedicated team that knows your file and answers your call." },
  { icon: "award", title: "Experienced leadership", text: "42 years of combined director experience in credit, risk and law." },
  { icon: "landmark", title: "Licensed & regulated", text: "A licensed credit provider operating under Central Bank of Kenya rules." },
];

/** Feature highlights on the home page. */
export const featureHighlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "zap", title: "Fast Approval", text: "Same-day approval for qualifying applicants." },
  { icon: "coins", title: "Flexible Repayment", text: "Repayment plans shaped around your income or cash flow." },
  { icon: "car", title: "Keep Driving Your Car", text: "Use your logbook as security and stay on the road." },
  { icon: "landmark", title: "Licensed & Regulated", text: "A credit provider licensed by the Central Bank of Kenya." },
];

export const howItWorks: ProcessStep[] = [
  { title: "Choose a product", text: "Pick the loan or cover that fits your goal." },
  { title: "Apply", text: "Request a call back, call us or visit our Westlands office." },
  { title: "Get assessed", text: "We review your documents and what you can comfortably repay." },
  { title: "Receive funds", text: "Once approved and accepted, funds are disbursed — often the same day." },
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
  summary: string;
  highlights?: { title: string; org: string; detail: string; current?: boolean }[];
  education?: string[];
  quote?: string;
  tags?: string[];
}

export const ceo: TeamMember = {
  slug: "selestine-mwanga",
  name: "Selestine K. Mwanga",
  role: "CEO & Managing Director",
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
};

/** Add new team members here — the Meet the Team page is data-driven. */
export const members: TeamMember[] = [
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

export const team: TeamMember[] = [ceo, ...members];

/* ───────────────────────── Careers ───────────────────────── */

export interface Role {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline?: string;
  summary: string;
}

export const careers = {
  intro:
    "We’re a growing team building practical, transparent financial solutions for individuals and businesses across Kenya. If you take ownership, move with pace and care about the people you serve, we’d like to hear from you.",
  reasons: [
    { icon: "sprout" as IconName, title: "Grow with responsibility", text: "Own your work, learn fast and see the impact on real clients." },
    { icon: "gauge" as IconName, title: "Move with pace and discipline", text: "We value speed, rigour, collaboration and continuous improvement." },
    { icon: "heart" as IconName, title: "Put people first", text: "Serve clients and colleagues with professionalism, respect and a solutions mindset." },
  ],
  culture: [
    {
      icon: "briefcase" as IconName,
      title: "Professional and accountable",
      text: "We do what we say, own our results and hold ourselves to the standards of a regulated lender.",
    },
    {
      icon: "zap" as IconName,
      title: "Fast and collaborative",
      text: "Small teams, short decision paths and colleagues who share what they know.",
    },
    {
      icon: "users" as IconName,
      title: "Client-centred",
      text: "Every role connects back to a person trying to study, build, drive or grow — and we treat them that way.",
    },
  ],
  // TODO(client): open roles. Empty → the General Talent Pool card is shown.
  roles: [] as Role[],
  talentPool: {
    title: "General Talent Pool",
    text: "We’re always keen to hear from strong people in credit, risk, sales, finance, customer experience, operations and digital.",
  },
};
export const TALENT_POOL = "General Talent Pool";

/* ───────────────────────── Partners & media ───────────────────────── */

export interface Partner {
  name: string;
  logo: string;
  url: string;
}
// TODO(client): partner names, logos and URLs. Empty array hides the logo grid.
export const partners: Partner[] = [];

export const partnerPitch = {
  intro:
    "We work with organisations that help our clients protect, buy, study and grow. If your work fits one of these, we’d like to talk.",
  types: [
    { icon: "umbrella" as IconName, title: "Insurance underwriters", text: "Protection products for our borrowers." },
    { icon: "car" as IconName, title: "Motor dealers & valuers", text: "Vehicle valuation and logbook-backed financing for buyers." },
    { icon: "graduation-cap" as IconName, title: "Education agents & institutions", text: "Study abroad financing for admitted students." },
    { icon: "building" as IconName, title: "Employers & SACCOs", text: "Salary-based credit for staff and members." },
  ],
};

export interface NewsItem {
  title: string;
  date: string;
  summary: string;
  href?: string;
  image?: { src: string; alt: string };
}
// TODO(client): news and events.
export const news: NewsItem[] = [];

/* ───────────────────────── FAQs ───────────────────────── */

export const faqCategories = ["General", "Applying", "Logbook", "Personal Secured", "Study Abroad", "SME", "Insurance"] as const;
export type FaqCategory = (typeof faqCategories)[number];

const productFaqs = (slug: ProductSlug, category: FaqCategory) =>
  (getProduct(slug)?.faqs ?? []).map((f) => ({ ...f, category }));

export const faqs: (Faq & { category: FaqCategory })[] = [
  {
    category: "Applying",
    q: "How do I apply?",
    a: "Use the Apply for a Loan form, call us or visit our Westlands office. An officer will contact you to guide you.",
  },
  {
    category: "Applying",
    q: "How long does it take?",
    a: "Qualifying applications can be approved the same day; SME loans are disbursed in under 24 hours once approved.",
  },
  {
    category: "Applying",
    q: "What documents do I need?",
    a: "Each product page lists its typical requirements; final requirements may vary after assessment.",
  },
  {
    category: "Applying",
    q: "Can I apply from outside Nairobi?",
    a: "Yes. Start online or by phone and our team will guide you through the next steps.",
  },
  {
    category: "General",
    q: "Are you licensed?",
    a: "Yes. Anchorstone Capital Limited is licensed by the Central Bank of Kenya as a credit provider.",
  },
  {
    category: "General",
    q: "How do you use my personal data?",
    a: "Only to process your application and contact you, in line with the Kenya Data Protection Act, 2019. See our Privacy Policy.",
  },
  ...productFaqs("logbook-loan", "Logbook"),
  ...productFaqs("personal-secured-loan", "Personal Secured"),
  ...productFaqs("study-abroad-loan", "Study Abroad"),
  ...productFaqs("sme-loan", "SME"),
  ...productFaqs("insurance", "Insurance"),
];

/* ───────────────────────── Forms ───────────────────────── */

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

export const contactTimes = ["Morning", "Afternoon", "Evening"] as const;

/* ───────────────────────── Navigation ───────────────────────── */

export interface NavChild {
  label: string;
  href: string;
  icon?: IconName;
  text?: string;
}
export interface NavItem {
  label: string;
  href: string;
  /** Dropdown entries. `mega` renders the products mega-menu style (icon + tagline). */
  children?: NavChild[];
  mega?: boolean;
}

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Vision & Mission", href: "/about-us/vision-mission" },
      { label: "Core Values", href: "/about-us/core-values" },
      { label: "Meet Our CEO", href: "/about-us/ceo" },
      { label: "Meet the Team", href: "/about-us/team" },
    ],
  },
  {
    label: "Our Products",
    href: "/products",
    mega: true,
    children: products.map((p) => ({ label: p.name, href: `/products/${p.slug}`, icon: p.icon, text: p.tagline })),
  },
  { label: "Partners", href: "/partners" },
  { label: "Careers", href: "/careers" },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Media Centre", href: "/media" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];

export const aboutTabs = nav[1].children!;

export const applyLink = { label: "Apply for a Loan", href: "/apply-loan" } as const;

/* ───────────────────────── Legal ───────────────────────── */

// TODO(client): /privacy and /terms are working drafts. Have legal counsel review them before they are relied on
// (data controller registration, retention periods, processors, governing law, complaints process).
export const legalDraft = { reviewed: false, updated: "October 2026" };

/* ───────────────────────── Home hero ───────────────────────── */

export const heroCopy = {
  badge: "Licensed by the Central Bank of Kenya",
  headline: ["Credit that moves you", "forward."],
  intro: "Fast, fair and transparent credit for individuals, students and small businesses.",
  trustLabel: "Why borrowers choose us",
  trustPoints: [
    "Licensed by the Central Bank of Kenya",
    "Same-day approval for qualifying applicants",
    "Logbook loans up to KES 700,000",
    "SME funds disbursed in under 24 hours",
    "Transparent terms",
    "Ethical lending",
    "Personal support",
    "42 years of combined director experience",
  ],
  quickLinks: [
    { label: "Unlock your logbook", href: "/products/logbook-loan", icon: "car" as IconName },
    { label: "Study abroad", href: "/products/study-abroad-loan", icon: "graduation-cap" as IconName },
    { label: "Grow your business", href: "/products/sme-loan", icon: "briefcase" as IconName },
  ],
};
export { images, getImage, type SiteImage } from "./images";
