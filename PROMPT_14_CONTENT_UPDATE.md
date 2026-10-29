# PROMPT 14 — Contact, address, team and experience update

Use this on the website **now**, whatever stage the build is at. Before running it:
1. Copy `team/gilbert-lekilabu.jpg` from the new `anchorstone-assets.zip` into `public/brand/team/`.
2. Replace `public/brand/Anchorstone_Capital_Company_Profile.pdf` with the new PDF from the zip.

Then paste the block below into Claude Code.

```
Read CLAUDE.md. Apply these approved content changes everywhere on the site (src/content/site.ts first, then search the whole repo for any hard-coded leftovers):

1. EMAIL — the official email is now info@anchorstonecapitalltd.com.
   - siteConfig.contact.email = "info@anchorstonecapitalltd.com" (and careersEmail fallback).
   - Replace every "info@luminouscrown.co.ke", "luminouscrown" and "luminous" in code, metadata, JSON-LD, forms (Resend "to" address), footer, contact page and README.
   - Always render it as a mailto: link.

2. ADDRESS — the office is now:
   "Emperor Plaza, Koinange Street, Room 520, Nairobi"
   - siteConfig.contact.address = { line1: "Emperor Plaza, Room 520", line2: "Koinange Street", city: "Nairobi", country: "Kenya" } and a single-line version for the footer/top bar.
   - Replace every "Kofisi", "Westlands" mention, including the How-to-Apply step ("visit our office at Emperor Plaza, Koinange Street"), contact page, footer, JSON-LD PostalAddress (streetAddress "Emperor Plaza, Room 520, Koinange Street", addressLocality "Nairobi", addressCountry "KE"), and the Google Maps embed query ("Emperor Plaza, Koinange Street, Nairobi").

3. EXPERIENCE — replace every "42 years / 42 yrs combined director experience" with:
   - Stats and badges: "80+ yrs" with label "Combined leadership experience"
   - Why-choose-us tile: "Experienced leadership — Over 80 years of combined experience in banking, credit, risk and law."
   - Any hero trust row: "80+ years combined experience"

4. TEAM — replace the team data with these shorter, presentation-ready versions (keep the existing card layout; remove any old longer bios and tags):
   A. Selestine K. Mwanga — CEO & Managing Director (photo /brand/team/selestine-mwanga.jpg)
      Summary: Over 13 years in banking, lending and corporate leadership. Selestine brings deep expertise in credit risk assessment, financial modelling, portfolio growth and regulatory compliance — guiding organisations to sustainable profitability with ethical stewardship.
      (Keep his career highlights, education and vision quote on the CEO page as they are.)
   B. Oltele Lemek — Director (photo /brand/team/oltele-lemek.jpg)
      Bio: Over 17 years in senior financial management, investment and wealth advisory. Oltele has held senior roles at KCB Bank and SIB, and led Investment & Wealth Advisory at Moran Capital Management.
      Tags: 17+ years experience · Investment & wealth advisory · ICIFA licensed advisor
   C. Gilbert Lekilabu — Relationship Banking & Business Management (photo /brand/team/gilbert-lekilabu.jpg)
      Bio: A relationship banking and business management professional with over 10 years in the financial sector. Gilbert builds lasting client relationships, structures practical financing solutions and drives business growth.
      Tags: Relationship banking · Business management · Client portfolio growth
   - Remove every "Oltele G. Lekilabu" and "Mortgage & Real Estate Advisory" reference, and delete public/brand/team/oltele-lekilabu.jpg if nothing uses it.
   - Update alt text ("Portrait of Gilbert Lekilabu") and any Person JSON-LD.

5. DOMAIN — the domain is anchorstonecapitalltd.com (not anchorstone.com). Set siteConfig.url = "https://anchorstonecapitalltd.com" and use it as the NEXT_PUBLIC_SITE_URL fallback. Tell me to set NEXT_PUBLIC_SITE_URL=https://anchorstonecapitalltd.com in Vercel when the domain is connected.

6. Make sure the "Download company profile" links point to /brand/Anchorstone_Capital_Company_Profile.pdf (the file has been replaced with the updated version).

When done: grep the repo for "luminous", "Kofisi", "Westlands", "42 yrs", "42 years", "Oltele G", "Mortgage & Real Estate" and "anchorstone.com" (without "capitalltd") and confirm zero results. Then lint, type-check, build, and summarise the files changed.
```
