/**
 * Team members — names, roles and bios from the original Our Team page and the
 * individual profile pages (rebranded). Nothing here is invented.
 */
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  /** "over N years" / "N+ years" as stated in the bio. */
  experienceYears: number;
  experienceLabel: string;
  bio: string[];
  highlights?: { title: string; items: string[] };
  closing?: string;
  /** Legacy URL on the old site — redirected to the new profile (see next.config.ts). */
  legacyPath: string;
  /** Headshot (client-supplied). `position` = object-position focal point. Omit to show a monogram. */
  photo?: { src: string; alt: string; position?: string };
};

export const teamIntro = "We’re here to listen, guide, and support you every step of the way.";

export const team: TeamMember[] = [
  {
    slug: "selestine-mwanga",
    name: "Selestine K. Mwanga",
    role: "CEO & Managing Director",
    initials: "SM",
    experienceYears: 13,
    experienceLabel: "Years in banking, lending & corporate leadership",
    bio: [
      "Selestine K. Mwanga is a seasoned and accomplished financial and business professional with over 13 years of experience in banking, lending, and strategic corporate leadership. He demonstrates strong analytical skills and a deep understanding of credit risk assessment, financial modeling, and portfolio growth. His proven expertise spans banking operations, relationship management, and executive leadership, with a track record of guiding organizations toward sustainable profitability and long-term strategic growth.",
      "He possesses in-depth knowledge of lending structures, regulatory compliance, and financial performance monitoring, coupled with a practical approach to evaluating risk and ensuring transparency. Adept at structuring loan products, developing sustainable lending strategies, and mentoring teams, Selestine is committed to building enterprises that balance profitability with ethical stewardship.",
    ],
    highlights: {
      title: "Career Highlights",
      items: [
        "Senior Direct Sales Representative at KCB Bank, driving product uptake and customer acquisition.",
        "Teller & Cash Custodian at NIC Bank (later merged with CBA to form NCBA), ensuring operational accuracy and compliance.",
        "Relationship Manager at NCBA Bank and Sidian Bank, managing client portfolios and delivering tailored financial solutions.",
        "CEO & Managing Director at Jeysell Company Limited, providing strategic leadership in real estate and wealth creation.",
        "Currently CEO & Managing Director at Anchorstone Capital Ltd, a lending company focused on transparent, ethical, and scalable financial solutions.",
      ],
    },
    closing:
      "Selestine holds a degree in Economics from the University of Nairobi and is currently pursuing a Master’s in Strategic Management. His vision is to position Anchorstone Capital Ltd as a trusted partner for investors and clients alike — delivering sustainable returns, responsible lending practices, and community impact.",
    legacyPath: "/selestine-mwanga-2",
    photo: { src: "/images/team/selestine-mwanga.webp", alt: "Portrait of Selestine K. Mwanga", position: "center 25%" },
  },
  {
    slug: "oltele-lemek",
    name: "Oltele Lemek",
    role: "Director",
    initials: "OL",
    experienceYears: 17,
    experienceLabel: "Years in financial management, investment & advisory",
    bio: [
      "Oltele Lemek is a seasoned and accomplished financial professional with over 17 years of experience in senior financial management, investment management, and strategic advisory services. Demonstrates strong analytical skills and a deep understanding of performance-based financing projects, budget monitoring, financial reporting, and investment oversight. Proven expertise in banking, wealth management, and relationship management, with a track record of providing strategic leadership and long-term financial planning.",
      "Possesses in-depth knowledge of financial accounting processes and a practical approach to monitoring and evaluating financial performance. Adept at assessing financial situations, developing investment strategies, and guiding organizations toward sustainable financial growth.",
      "Career highlights include senior management roles at top-tier institutions such as KCB Bank, serving as Senior Financial Advisor at SIB, and Head of Investment and Wealth Advisory Services at Moran Capital Management Ltd. A licensed investment and wealth advisor accredited by ICIFA.",
    ],
    legacyPath: "/f-a-lemek",
    photo: { src: "/images/team/oltele-lemek.webp", alt: "Portrait of Oltele Lemek", position: "center 15%" },
  },
  {
    slug: "oltele-gilbert",
    name: "Oltele Gilbert",
    role: "Mortgage & Real Estate Advisor",
    initials: "OG",
    experienceYears: 10,
    experienceLabel: "Years in real estate & financial services",
    bio: [
      "Experienced Mortgage and Real Estate Advisory expert with a solid background spanning 10+ years in the real estate and financial sectors. Demonstrated success in providing strategic guidance and expert advice to clients seeking optimal mortgage solutions and real estate investments. Proficient in mortgage origination, underwriting, and refinancing, with a keen understanding of market trends and regulations.",
      "Exceptional ability to analyze financial data and assess risk, ensuring clients make informed decisions. Skilled in cultivating lasting client relationships built on trust and transparency. Adept at navigating the intricacies of the real estate market, including residential and commercial properties.",
      // TODO(client): the last sentence of the original bio ("Seeking opportunities to contribute
      // expertise to a dynamic real estate or financial team") reads like a CV line — confirm or remove.
      "Committed to helping clients achieve their homeownership and investment goals while adhering to the highest ethical standards. Seeking opportunities to contribute expertise to a dynamic real estate or financial team.",
    ],
    legacyPath: "/gilbert-leklabu-2",
    photo: { src: "/images/team/oltele-gilbert.webp", alt: "Portrait of Oltele Gilbert", position: "center 25%" },
  },
];

export const getMember = (slug: string) => team.find((m) => m.slug === slug);

/** First sentence of the bio, for cards and meta descriptions (initials like "K." don't end a sentence). */
export const summaryOf = (m: TeamMember) => m.bio[0].split(/(?<=[a-z]{2}\.)\s/)[0];
