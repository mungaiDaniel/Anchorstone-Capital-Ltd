# Anchorstone Capital — Website Upgrade Prompt Pack (for Claude Code)

Site: https://anchorstone-capital-ltd.vercel.app (Next.js on Vercel)
Goal: rebrand and restructure the site to match the new Anchorstone Capital company profile — 5 products, full About / Team / Partners / Media / Contact, new brand colours and logo, and fix the existing bugs.

---

## How to use this pack

1. **Copy the assets into the repo first.** Unzip `anchorstone-assets.zip` into `public/brand/` so you have:
   - `public/brand/logo_full_blue.png` · `logo_full_white.png` (full lockup)
   - `public/brand/logo_mono_blue.png` · `logo_mono_white.png` (A/C monogram only)
   - `public/brand/team/selestine-mwanga.jpg` · `oltele-lemek.jpg` · `oltele-lekilabu.jpg`
   - `public/brand/Anchorstone_Capital_Company_Profile.pdf` (downloadable profile)
2. **Save PROMPT 0 as `CLAUDE.md` in the repo root** (or paste it as the first message). It is the shared brief every later prompt relies on.
3. **Run PROMPTS 1 → 11 one at a time** in Claude Code. Review the result and commit after each one before moving on (`git add -A && git commit -m "…"`).
4. PROMPT 11 (domain switch) is for **tomorrow**, once `anchorstone.com` is live.

---

## PROMPT 0 — Project brief (save as `CLAUDE.md`)

```markdown
# Anchorstone Capital Ltd — website

## What this is
Marketing + lead-generation website for Anchorstone Capital Limited, a private financial institution in Nairobi, Kenya, licensed by the Central Bank of Kenya (CBK) as a credit provider. Next.js app deployed on Vercel.

## Brand
- Logo files live in /public/brand (full lockup + A/C monogram, blue and white versions). Never recolour or stretch the logo.
- Colours (define once as design tokens / Tailwind theme / CSS variables and use everywhere):
  - --brand-blue:  #1C24A0  (primary — from the logo)
  - --brand-navy:  #0B1050  (dark sections, hero, footer)
  - --ink:         #171A3A  (headings)
  - --text:        #3D4163  (body)
  - --muted:       #6E7395
  - --tint:        #EEF0FA  (light panels)
  - --tint-2:      #DDE0F5
  - --paper:       #FBFBFE  (page background)
  - --line:        #D9DCEE  (borders)
  - Accent text on navy: #AEB4F0
- Fonts (via next/font/google): headings "EB Garamond" (500), body "Manrope" (400/500/600/700).
- Visual language: clean, premium, lots of white space; navy hero blocks; diagonal "shard" shapes echoing the "A" of the monogram; faint oversized monogram as a background watermark on dark sections; thin-stroke line icons (lucide-react); small uppercase letter-spaced eyebrows above serif headings.
- Tone: confident, plain English, short sentences. No hype words, no emoji.

## Single source of truth for content
- All copy, products, team, contact details live in `src/content/site.ts` (create it; adjust path to the repo's structure). Components must read from it — no hard-coded copy in components.
- Contact details are defined ONCE in `site.ts` (`siteConfig.contact`) and reused (header, footer, contact page, metadata, JSON-LD).

## Products (exactly five, in this order)
1. Logbook Loan — up to KES 700,000
2. Personal Secured Loan — up to KES 300,000
3. Study Abroad Loan — amount tailored to the study plan (NO cap shown)
4. SME Loan — up to KES 300,000
5. Insurance — protection arranged through licensed partners
(The old "Unsecured Personal", "Unsecured Business" and "Top-Up" loans are retired. Remove any "no collateral required" claims — the personal product is now SECURED.)

## Rules
- Keep the existing routes working: /, /about-us, /our-team, /contact-us, /apply-loan. Add new ones as instructed.
- Mobile-first, fully responsive (360px → 1440px). No horizontal scroll.
- Accessibility: semantic HTML, one h1 per page, alt text on all images, visible focus states, colour contrast AA, keyboard-navigable menus and forms.
- Performance: next/image for all images, no layout shift, Lighthouse ≥ 90 on mobile for Performance, Accessibility, Best Practices, SEO.
- Never invent facts (rates, fees, licence numbers, testimonials, partner logos). Where something is unknown, leave a clearly marked `TODO(client)` in site.ts — not visible placeholder text on the live site.
- After each task: run the linter, type-check and `npm run build`; fix all errors before reporting done. Summarise what changed and list files touched.
```

---

## PROMPT 1 — Audit and plan (no code changes)

```
Read CLAUDE.md first. Then audit this repo WITHOUT changing any files:

1. Report the stack: Next.js version, App Router vs Pages Router, styling (Tailwind? CSS modules?), component library, icon library, how images and metadata are handled.
2. Map every route and the components each page uses.
3. List every place copy, contact details, products and colours are hard-coded.
4. Confirm these known bugs and find their source:
   - canonical / og:url / og:image point to http://localhost:3000
   - footer email is info@luminouscrown.co.ke and is not a mailto link
   - "&amp;" double-escaping in titles and alt text
   - three stray "A" text nodes in the hero
   - "Why borrowers choose us" list rendered twice
   - calculator tenure shows "1–12 Months" but helper text says "years"; calculator output is wrong (KES 5,000 / 1 month / 20% p.a. gives 558 interest)
   - how-it-works says "next business day" but elsewhere "under 12/24 hours"
   - step numbering duplicated ("1. 01 Step 1")
5. Give me a step-by-step implementation plan for prompts 2–10 below, with the files you expect to create/modify. Wait for my go-ahead.
```

---

## PROMPT 2 — Brand foundation and content file

```
Read CLAUDE.md. Implement the brand foundation:

1. Design tokens: add the colour palette from CLAUDE.md to the Tailwind theme (or CSS variables if no Tailwind) and replace all existing brand colours across the site with the tokens.
2. Fonts: load EB Garamond (headings) and Manrope (body) with next/font/google; apply globally (h1–h3 = EB Garamond 500, body = Manrope).
3. Logo: replace the current logo with /public/brand/logo_full_blue.png in the header (use the monogram /public/brand/logo_mono_blue.png on small screens if the lockup is too wide) and logo_full_white.png on navy backgrounds (footer). Keep aspect ratio; add proper alt text "Anchorstone Capital Limited".
4. Favicon + app icons: generate favicon.ico, icon.png (512) and apple-icon.png (180) from logo_mono_blue.png on a white background, using the App Router file conventions (or equivalent).
5. Create src/content/site.ts using the CONTENT APPENDIX at the bottom of this message as the single source of truth (siteConfig, about, mission, vision, values, whyUs, products, team, steps, contact). Type it with TypeScript interfaces.
6. Create reusable UI primitives: <Eyebrow>, <SectionHeading>, <Button variant="primary|secondary|ghost-light">, <Card>, <IconBadge>, <DiagonalDivider> (the angled shard divider between navy and light sections), <Watermark> (faint oversized monogram on dark sections).

Do not restructure pages yet. Build, fix errors, summarise.

[Paste the CONTENT APPENDIX from the bottom of this file here]
```

---

## PROMPT 3 — Fix the existing bugs

```
Read CLAUDE.md. Fix every bug confirmed in the audit:

1. Metadata: create a single SITE_URL from process.env.NEXT_PUBLIC_SITE_URL (fallback "https://anchorstone-capital-ltd.vercel.app"). Use it for metadataBase, canonical, og:url and og:image. No localhost anywhere in production output.
2. Email/phone: read from siteConfig.contact; render email as mailto: and phone as tel: links everywhere.
3. Remove "&amp;" double-escaping in titles, alt text and metadata (pass plain strings, let React escape).
4. Remove the stray "A" text nodes in the hero.
5. Render the features list once (if it is a marquee, make the duplicate aria-hidden and hide it from screen readers).
6. Fix the loan calculator:
   - Tenure in MONTHS (1–12 for Personal Secured / SME, 1–24 for Logbook); helper text must say months.
   - Use standard reducing-balance amortisation: monthly rate r = annualRate/12/100; instalment = P·r / (1 − (1+r)^−n); total = instalment·n; interest = total − P. Handle r = 0.
   - Show monthly instalment, total repayment and total interest, formatted as "KES 12,345".
   - Add a product selector (Logbook / Personal Secured / SME) that sets the max amount (700,000 / 300,000 / 300,000).
   - Add the line: "Figures are indicative. Final terms depend on your application and our credit assessment."
   - Write unit tests for the calculation function (including r = 0 and the 1-month case).
7. Make disbursement timing consistent: use "Same-day approval for qualifying applicants" and "Funds disbursed in under 24 hours" — remove "next business day".
8. Fix duplicated step numbering — show the number once.

Build, run tests, summarise.
```

---

## PROMPT 4 — Home page redesign

```
Read CLAUDE.md. Rebuild the home page (/) with this section order, all copy from site.ts:

1. HERO (navy background, faint monogram watermark on the right, diagonal shard divider at the bottom):
   eyebrow "Licensed by the Central Bank of Kenya"
   h1 "Credit that moves you forward."  (italicise "forward." in #AEB4F0)
   sub: siteConfig.tagline
   CTAs: "Apply for a Loan" → /apply-loan (primary), "Explore our products" → #products (ghost-light)
   Trust row under CTAs: "42 years combined director experience" · "Same-day approval" · "CBK licensed"
2. STATS STRIP (3 figures, thin dividers): 42 yrs combined director experience · 5 credit & protection products · KES 700K maximum logbook loan.
3. PRODUCTS (#products): 5 cards in a responsive grid (1 col mobile, 2 tablet, 3+2 desktop). Each: icon badge, product name, one-line summary, amount pill, "Learn more" → /products/[slug].
4. WHY CHOOSE US: 6 tiles from site.ts whyUs (icon, title, one line).
5. LOAN CALCULATOR (the fixed one from Prompt 3) with "Apply now" passing ?product=&amount=&tenure= to /apply-loan.
6. HOW TO APPLY: 3 steps from site.ts with a connecting line.
7. MEET OUR LEADERSHIP teaser: Selestine K. Mwanga photo, name, title, 2-line summary, "Meet the team" → /our-team.
8. DOWNLOAD PROFILE banner: "Download our company profile (PDF)" → /brand/Anchorstone_Capital_Company_Profile.pdf (download attribute).
9. FINAL CTA (navy): "Ready to take the next step?" + Apply / Contact buttons.

Remove the old stock-photo stat banner and the old Personal/Business/Top-Up sections. Keep existing images only if they still fit a section; otherwise use icons and brand shapes (no new stock photos). Build and summarise.
```

---

## PROMPT 5 — Product pages

```
Read CLAUDE.md. Create a products section:

1. /products — overview page listing all 5 products (same card as home, larger, with "Ideal for" line).
2. /products/[slug] — one statically generated page per product (generateStaticParams from site.ts). Slugs: logbook-loan, personal-secured-loan, study-abroad-loan, sme-loan, insurance.
   Layout:
   - Navy/blue gradient header band with monogram watermark, eyebrow "Our Products · 0N", product name (h1), amount pill, large line icon in a circle; diagonal divider below.
   - Intro paragraph.
   - Two columns: "Key features" (check-icon list) and "What you need" (requirements list in a tint panel).
   - "Ideal for" strip.
   - CTA: "Apply for this loan" → /apply-loan?product=<slug> (Insurance: "Request a quote" → /contact-us?topic=insurance).
   - "Other products" row linking to the other 4.
3. Add "Products" to the header nav as a dropdown listing the 5 products (keyboard accessible, closes on Escape / outside click; on mobile, an accordion inside the menu).
4. Per-page metadata (title "Logbook Loan — up to KES 700,000 | Anchorstone Capital", description from intro) and FinancialProduct JSON-LD.

Build and summarise.
```

---

## PROMPT 6 — About Us page

```
Read CLAUDE.md. Rebuild /about-us from site.ts:

1. Page header (navy band) — eyebrow "Who we are", h1 "About Anchorstone".
2. Intro: about.lead (large) + about.body paragraphs.
3. "Licensed & regulated" callout: "Anchorstone Capital Limited is licensed by the Central Bank of Kenya as a credit provider." with a landmark icon. (Licence number: TODO(client) in site.ts — do not render until filled.)
4. Stats strip (same component as home).
5. Core expertise: Credit & risk management · Micro-lending · Legal & compliance.
6. Mission & Vision: two stacked cards (navy, blue) + pull-quote "We lend the way we would want to borrow: clearly, quickly and with respect."
7. Core values: 4 numbered rows (Integrity, Transparency, Responsible Lending, Client First).
8. Why choose us: the 6 tiles.
9. CTA to /our-team and /contact-us.

Metadata + Organization JSON-LD (name, url, logo, contactPoint, address). Build and summarise.
```

---

## PROMPT 7 — Our Team page

```
Read CLAUDE.md. Rebuild /our-team from site.ts team data. Photos are in /public/brand/team/ (colour — do NOT apply grayscale filters).

1. Header: eyebrow "Our people", h1 "Meet Our Team".
2. LEADERSHIP feature (CEO): large card — photo left (4:5, object-cover, rounded), navy panel right with role eyebrow, name, summary. Below: "Career highlights" vertical timeline (current role tagged "Current"), "Education" list, and his vision quote.
3. TEAM grid: cards for Oltele Lemek (Director) and Oltele G. Lekilabu (Mortgage & Real Estate Advisory): photo, role, name, bio, credential tags (pill chips).
4. Cards stack on mobile; side-by-side on desktop. Photos via next/image with sizes set; meaningful alt text ("Portrait of Selestine K. Mwanga").
5. Data model should allow adding more team members later without code changes.

Build and summarise.
```

---

## PROMPT 8 — Partners, Media and Contact

```
Read CLAUDE.md.

A. PARTNERS — add a "Our Partners" section on /about-us (and a slim logo strip on the home page above the final CTA):
   - Render from site.ts partners: [] (empty for now — TODO(client)). If the array is empty, hide the section entirely. Each partner: name, logo path, url. Logos grayscale → colour on hover.

B. MEDIA & NEWS — create /media:
   - Header: eyebrow "Newsroom", h1 "Media & News".
   - "Press enquiries" block: how media can reach us (email + phone from siteConfig).
   - News/events list rendered from site.ts news: [] (title, date, summary, optional link/image). Empty state: "News and announcements will appear here." 
   - Add "Media" to header nav and footer.

C. CONTACT — rebuild /contact-us:
   - Two columns: contact details (address, phone tel:, email mailto:, office hours TODO(client)) + contact form.
   - Form fields: full name, phone (Kenyan format validation, e.g. 07xx / +2547xx), email, topic (General, Logbook Loan, Personal Secured Loan, Study Abroad Loan, SME Loan, Insurance, Media/Press, Partnership) — preselect from ?topic=, message, consent checkbox.
   - Validate client + server side (zod). Submit to a Next.js route handler / server action that emails siteConfig.contact.email using Resend (RESEND_API_KEY env var). If the key is missing, log the submission and still show success in development. Add a honeypot field + basic rate limit.
   - Embedded map (Google Maps iframe for "Kofisi, Westlands, Nairobi", lazy-loaded) below.

Build and summarise. List the env vars I need to set on Vercel.
```

---

## PROMPT 9 — Apply Loan page

```
Read CLAUDE.md. Update /apply-loan:

1. Product selector with the 4 lending products (Logbook, Personal Secured, Study Abroad, SME). Preselect from ?product= and prefill amount/tenure from the calculator query params.
2. When a product is selected, show its "What you need" requirements list beside the form.
3. Fields: full name, national ID number, phone, email, product, amount (respect product max; Study Abroad has no max), tenure (months), employment/business type, county, how did you hear about us, consent to credit check + privacy notice.
4. Validation with zod; submit via server action → email to siteConfig.contact.email (Resend) with a clean summary; success screen with reference number and "What happens next" (3 steps).
5. Remove all "no collateral" wording. Remove the retired Top-Up product.
6. Add a short privacy notice link (create /privacy with a basic Kenya Data Protection Act 2019 compliant notice marked TODO(client) for legal review).

Build and summarise.
```

---

## PROMPT 10 — Header, footer, SEO and QA pass

```
Read CLAUDE.md.

1. HEADER: logo left; nav: Home, Products (dropdown), About Us, Our Team, Media, Contact Us; primary button "Apply Loan". Sticky with subtle shadow on scroll. Mobile: full-screen menu with focus trap.
2. FOOTER (navy, monogram watermark): white logo + one-line description + "Licensed credit provider regulated by the Central Bank of Kenya"; columns: Products (5 links), Company (About, Team, Media, Download profile), Contact (address, tel:, mailto:); bottom bar © {current year} Anchorstone Capital Ltd · Privacy.
3. SEO: per-page titles/descriptions, Open Graph image (generate a branded 1200×630 OG image: navy background, white logo, headline), sitemap.xml, robots.txt, Organization + LocalBusiness JSON-LD on the home page.
4. 404 page in brand style.
5. QA: test every page at 360, 768, 1024, 1440 widths; check all links and buttons; tab through every page; run Lighthouse (mobile) and fix anything under 90; ensure no console errors; `npm run build` clean.

Report the Lighthouse scores and anything you could not fix.
```

---

## PROMPT 11 — Domain switch (run once anchorstone.com is live)

```
Read CLAUDE.md. The new domain is live:

1. In site.ts set siteConfig.url = "https://anchorstone.com" and siteConfig.contact.email = "info@anchorstone.com" (confirm the exact mailbox name with me before committing).
2. Set NEXT_PUBLIC_SITE_URL=https://anchorstone.com (tell me to add it in Vercel → Settings → Environment Variables for Production).
3. Search the whole repo for "luminouscrown", "luminous", "vercel.app" and "localhost" and replace/remove every occurrence.
4. Regenerate sitemap/OG URLs; confirm canonical tags use the new domain.
5. Give me the Vercel domain steps: add anchorstone.com and www.anchorstone.com, set www → apex redirect, and the DNS records (A / CNAME) I need to add at the registrar.

Build and summarise.
```

---

## CONTENT APPENDIX (paste into Prompt 2)

```
SITE
- Name: Anchorstone Capital Limited (short: Anchorstone Capital)
- Tagline: Logbook loans, personal secured loans, study abroad financing, SME loans and insurance — delivered fast, fairly and transparently.
- Licence line: Licensed credit provider regulated by the Central Bank of Kenya.  (licenceNumber: TODO(client))
- Contact: phone +254 742 975 497 · email info@luminouscrown.co.ke (TEMPORARY — becomes info@anchorstone.com) · address Kofisi, Westlands, Nairobi, Kenya · office hours TODO(client)

ABOUT
- Lead: Anchorstone Capital Limited is a private financial institution based in Nairobi, Kenya, licensed by the Central Bank of Kenya as a credit provider.
- Body 1: We provide fast, transparent and responsible credit to salaried individuals, students and small businesses. From unlocking the value of a vehicle to funding studies abroad or growing an enterprise, our products are built around one idea: access to finance should be simple, fair and quick.
- Body 2: Our directors bring decades of combined experience in credit and risk management, micro-lending and legal practice — a foundation that lets us move quickly for our clients while lending prudently and ethically.
- Stats: 42 yrs combined director experience · 5 credit & protection products · KES 700K maximum logbook loan
- Core expertise: Credit & risk management · Micro-lending · Legal & compliance

MISSION: To give individuals and businesses fast, fair and transparent access to credit that helps them grow, study, build and protect what matters to them.
VISION: To be Kenya’s most trusted partner for accessible, responsible finance — recognised for speed, integrity and genuine care for every client.
QUOTE: “We lend the way we would want to borrow: clearly, quickly and with respect.”

CORE VALUES
1. Integrity — We do what we say. Every recommendation and every loan is made in our clients’ best interest.
2. Transparency — Clear terms, clear costs, no surprises. Clients know exactly what they are signing up for.
3. Responsible Lending — We lend what clients can comfortably repay, protecting their wellbeing and our book.
4. Client First — Personal support from application to final repayment, with solutions shaped around real needs.

WHY CHOOSE US (icon · title · line)
- zap · Fast decisions · Same-day approvals and quick disbursement so funds arrive when they matter.
- eye · Transparent terms · Simple, upfront pricing with no hidden charges.
- heart · Ethical lending · Affordability checks on every application — we never over-lend.
- users · Personal support · A dedicated team that knows your file and answers your call.
- award · Experienced leadership · 42 years of combined director experience in credit, risk and law.
- landmark · Licensed & regulated · A licensed credit provider operating under Central Bank of Kenya rules.

PRODUCTS
1. Logbook Loan (slug logbook-loan, icon car) — Up to KES 700,000
   Summary: Use your vehicle’s logbook as security and keep driving your car.
   Intro: Unlock the value of your vehicle without giving it up. Our logbook loan uses your car’s logbook as security, so you can access a larger amount quickly while you keep driving as usual.
   Features: Loans of up to KES 700,000 · Keep using your vehicle throughout the loan · Quick valuation and fast approval · Flexible monthly repayment plans · Clear, upfront pricing with no hidden fees
   Requirements: Original logbook registered in the applicant’s name · National ID and KRA PIN certificate · Valid comprehensive motor insurance · Vehicle valuation report · 6 months’ bank or M-Pesa statements
   Ideal for: Car owners, business people and professionals who need a larger amount fast.
2. Personal Secured Loan (slug personal-secured-loan, icon user) — Up to KES 300,000
   Summary: Fast credit for salaried individuals with flexible repayment.
   Intro: Cover school fees, emergencies, a big purchase or a personal project with a loan designed for salaried individuals. Approval is fast and repayments are matched to your pay cycle.
   Features: Loans of up to KES 300,000 · Same-day approval for qualifying applicants · Repayments aligned to your salary · Flexible tenures of up to 12 months · Personal support from a dedicated officer
   Requirements: National ID and KRA PIN certificate · 3 latest payslips · 6 months’ bank statement · 1-year M-Pesa statement
   Ideal for: Employed individuals with a regular, verifiable income.
3. Study Abroad Loan (slug study-abroad-loan, icon graduation-cap) — Financing tailored to your study plan
   Summary: Fund tuition, visa and travel costs for studies overseas.
   Intro: Studying overseas is a life-changing investment. Our study abroad loan helps students and their families meet the costs of getting there — structured around your admission, programme and timelines.
   Features: Covers tuition, visa and travel costs · Amount tailored to your programme · Repayment structured around your family’s income · Guidance through the application process · Fast turnaround to meet admission deadlines
   Requirements: Admission or offer letter from the institution · Passport / National ID and KRA PIN · Sponsor’s proof of income · 6 months’ bank or M-Pesa statements
   Ideal for: Students admitted to institutions abroad and the parents or sponsors supporting them.
4. SME Loan (slug sme-loan, icon briefcase) — Up to KES 300,000
   Summary: Working capital for entrepreneurs and small businesses.
   Intro: Restock, take on a new contract or bridge a cash-flow gap. Our SME loan gives entrepreneurs and small business owners quick access to working capital, with repayments shaped around how the business earns.
   Features: Loans of up to KES 300,000 · Funds disbursed in under 24 hours · Repayment plans tailored to your cash flow · Dedicated business support · Option to top up as your business grows
   Requirements: Business registration documents · National ID and KRA PIN of the owner(s) · 6 months’ bank statement · 1-year M-Pesa statement · Business Till or Paybill statements
   Ideal for: Small and growing businesses that need flexible working capital.
5. Insurance (slug insurance, icon umbrella) — Protection for what matters
   Summary: Cover for you, your vehicle, your loan and your business.
   Intro: Every loan is safer when what you own is protected. We help clients put the right cover in place — for their vehicle, their family, their business and their loan — through licensed insurance partners.
   Features: Motor insurance for financed vehicles · Credit life cover that protects your family · Business and stock cover for SMEs · Health and personal accident cover · Advice on the right level of protection
   Requirements: National ID and KRA PIN certificate · Details of the asset or person to be covered · Logbook (for motor cover) · Business registration (for business cover)
   Ideal for: Borrowers and businesses who want peace of mind alongside their financing.

HOW TO APPLY
1. Talk to us — Call, email or visit our Westlands office. We’ll help you choose the right product and confirm what you qualify for.
2. Submit your documents — Share the required documents. Our team reviews your application quickly and keeps you updated.
3. Receive your funds — Once approved and accepted, funds are disbursed directly to you — often the same day.

TEAM
A. Selestine K. Mwanga — CEO & Managing Director (photo /brand/team/selestine-mwanga.jpg)
   Summary: A seasoned financial and business professional with over 13 years of experience in banking, lending and strategic corporate leadership. Selestine brings deep expertise in credit risk assessment, financial modelling, portfolio growth, lending structures and regulatory compliance — with a track record of guiding organisations to sustainable profitability while balancing growth with ethical stewardship.
   Career highlights:
   - CEO & Managing Director — Anchorstone Capital Ltd (Current): Leading a lending company focused on transparent, ethical and scalable financial solutions.
   - CEO & Managing Director — Jeysell Company Limited: Strategic leadership in real estate and wealth creation.
   - Relationship Manager — NCBA Bank & Sidian Bank: Managed client portfolios and delivered tailored financial solutions.
   - Teller & Cash Custodian — NIC Bank (now NCBA): Ensured operational accuracy and compliance.
   - Senior Direct Sales Representative — KCB Bank: Drove product uptake and customer acquisition.
   Education: Degree in Economics, University of Nairobi · Master’s in Strategic Management (in progress)
   Vision quote: “To position Anchorstone Capital as a trusted partner for investors and clients alike — delivering sustainable returns, responsible lending and community impact.”
B. Oltele Lemek — Director (photo /brand/team/oltele-lemek.jpg)
   Bio: A seasoned financial professional with over 17 years of experience in senior financial management, investment management and strategic advisory. Oltele brings proven expertise in banking, wealth management and relationship management, with deep knowledge of performance-based financing, budget monitoring, financial reporting and investment oversight.
   Tags: Senior management, KCB Bank · Senior Financial Advisor, SIB · Head of Investment & Wealth Advisory, Moran Capital Management · Licensed investment & wealth advisor (ICIFA)
C. Oltele G. Lekilabu — Mortgage & Real Estate Advisory (photo /brand/team/oltele-lekilabu.jpg)  (name spelling: TODO(client) confirm)
   Bio: An experienced mortgage and real estate advisory expert with over 10 years in the real estate and financial sectors. He is proficient in mortgage origination, underwriting and refinancing, with a keen understanding of market trends, regulation and risk across residential and commercial property — helping clients make informed decisions built on trust and transparency.
   Tags: Mortgage origination & underwriting · Refinancing · Residential & commercial property · Risk & market analysis

PARTNERS: [] TODO(client)
NEWS: [] TODO(client)
```
