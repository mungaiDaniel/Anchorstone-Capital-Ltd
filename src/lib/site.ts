/**
 * Single source of truth for site-wide content.
 * Only add facts that appear in the original site's HTML — never invent them.
 */
export const site = {
  name: "Anchorstone Capital Ltd",
  shortName: "Anchorstone Capital",
  tagline: "Affordable Loans & Fast Credit Solutions in Kenya",
  description:
    "Anchorstone Capital Ltd offers fast, affordable loans and trusted credit solutions in Kenya. Apply online today for flexible repayment and quick approvals.",
  // TODO(deploy): set NEXT_PUBLIC_SITE_URL to the production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_KE",
} as const;

export type NavLink = { label: string; href: string };

// Matches the original site's menu (Apply Loan is shown as the header button).
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Team", href: "/our-team" },
  { label: "Contact Us", href: "/contact-us" },
];

export const applyLink: NavLink = { label: "Apply Loan", href: "/apply-loan" };

/** Contact details — from the original Contact Us page. */
export const contact = {
  phone: { display: "+254 742 975 497", href: "tel:+254742975497" },
  // TODO(client): still on the old domain — switch once an @anchorstone… mailbox exists.
  email: { display: "info@luminouscrown.co.ke", href: "mailto:info@luminouscrown.co.ke" },
  address: {
    display: "Kofisi, Westlands",
    locality: "Nairobi",
    // Query used by the original site's Google Map embed.
    // TODO(client): the map pin says "Eden Square Complex, Chiromo Road … Waiyaki Way" while the page
    // says "Kofisi, Westlands" — confirm the exact office address.
    mapQuery:
      "Eden Square Complex, Chiromo Road, Westlands 7th Floor, Block 1, 7th Floor Waiyaki Wy, Nairobi",
  },
};

export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address.mapQuery)}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(contact.address.mapQuery)}&t=m&z=15&output=embed&iwloc=near`;
