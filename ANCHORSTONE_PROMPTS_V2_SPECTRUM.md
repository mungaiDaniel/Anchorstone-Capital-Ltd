# Anchorstone Capital — Website Upgrade, Pack 2 (Spectrum Credit as reference)

**Reference site:** https://www.spectrumcredit.co.ke — use it as the reference for **structure, page types and layout patterns**. Do **not** copy its text, images, colours or logo. Anchorstone keeps its own blue brand and its own content.
**Our site:** https://anchorstone-capital-ltd.vercel.app (Next.js on Vercel)

This pack replaces the first prompt pack. Run the prompts **one at a time** in Claude Code, review the result, and commit before moving to the next one.

---

## What we are taking from Spectrum Credit

| Pattern on Spectrum | What Anchorstone gets |
|---|---|
| Thin top bar with licence note, phone and email | Same: "Licensed credit provider · Regulated by the Central Bank of Kenya" + phone + email |
| Nav with dropdowns: About ▾, Our Products ▾, Media ▾, plus Partners, Careers, Contact and an "Apply for a Loan" button | Same menu structure |
| About split into sub-pages: About, Vision & Mission, Core Values, Meet Our Founder, Meet the Board | About, Vision & Mission, Core Values, Meet Our CEO, Meet the Team |
| Hero with headline, short punchy tagline and a quick loan form beside it | Same layout, Anchorstone copy |
| Feature icons, product cards with "Learn more →", stats band, how-it-works steps, closing call-to-action band | Same sections |
| Products page: filter chips, cards with category tag, "Typical requirements" checklist, two buttons | Same, for our 5 products |
| Product page: hero + Apply, "Designed around your goals", what to expect, numbered requirements 01–05, 4-step how it works | Same, plus product FAQs and related products |
| Careers page: hero, 3 "why work with us" cards, culture blocks, open roles / general talent pool | Same, plus a proper CV upload form |
| Pop-up loan application ("Tell us what you need") and floating WhatsApp button | Same |
| FAQ page and Media Centre | Same |

**What we deliberately do better than Spectrum:**
- Their stats counters show "0" when JavaScript hasn't run. Ours render the real numbers on the server and only animate them.
- Their testimonial is marked "illustrative". We show **no testimonials or success stories until real ones exist**.
- Their careers page sends people to an email link. Ours has a working CV upload form.

**What stays Anchorstone's own:** blue/navy colours, EB Garamond + Manrope fonts, the A/C monogram watermark and diagonal "shard" shapes, and all copy from the content appendix.

---

## Before you start

1. Unzip `anchorstone-assets.zip` into `public/brand/` (logos, colour team photos and the profile PDF).
2. Save **PROMPT 0** as `CLAUDE.md` in the repo root.
3. Run PROMPT 1, read the plan it gives you, then run 2 → 12 one by one.

---

## PROMPT 0 — Project brief (save as `CLAUDE.md`)

```markdown
# Anchorstone Capital Ltd — website

## What this is
Marketing and lead-generation website for Anchorstone Capital Limited, a private financial institution in Nairobi, Kenya, licensed by the Central Bank of Kenya (CBK) as a credit provider. Next.js app deployed on Vercel.

## Reference site
https://www.spectrumcredit.co.ke (a competitor) is our reference for STRUCTURE and LAYOUT PATTERNS only: top bar, nav with dropdowns, About sub-pages, product pages, careers page, quick-apply form, pop-up loan form, WhatsApp button, numbered steps. Never copy its text, images, colours, logo or claims.

## Brand
- Logo files in /public/brand (full lockup + A/C monogram, blue and white versions). Never recolour or stretch.
- Colour tokens (define once, use everywhere):
  --brand-blue #1C24A0 (primary buttons, links, icons) · --brand-navy #0B1050 (hero, dark bands, footer) · --ink #171A3A (headings) · --text #3D4163 (body) · --muted #6E7395 · --tint #EEF0FA (light panels) · --tint-2 #DDE0F5 · --paper #FBFBFE (page background) · --line #D9DCEE (borders) · --on-navy #AEB4F0 (accent text on navy) · WhatsApp green #25D366 only for the WhatsApp button.
- Fonts (next/font/google): headings "EB Garamond" 500; body and UI "Manrope" 400–700.
- Shape: cards and inputs 12–16px radius; buttons 10px radius; soft borders (--line), very light shadows.
- Visual language: navy hero bands with a faint oversized monogram watermark; diagonal "shard" dividers echoing the "A" in the logo; small uppercase letter-spaced eyebrow labels above headings; thin-stroke icons (lucide-react); arrow CTAs ("Apply for a Loan →"); numbered items 01, 02, 03.
- Tone: confident, plain English, short sentences. Punchy taglines with full stops are welcome (e.g. "Anchored in trust. Built for progress."). No hype words, no emoji.

## Information architecture
Top bar → Header nav:
- Home (/)
- About Us ▾ — About Us (/about-us), Vision & Mission (/about-us/vision-mission), Core Values (/about-us/core-values), Meet Our CEO (/about-us/ceo), Meet the Team (/about-us/team)
- Our Products ▾ — All Products (/products), Logbook Loan, Personal Secured Loan, Study Abroad Loan, SME Loan, Insurance (/products/[slug])
- Partners (/partners)
- Careers (/careers)
- Media ▾ — Media Centre (/media), FAQs (/faq)
- Contact Us (/contact-us)
- Button: Apply for a Loan (opens the loan modal; /apply-loan is the full page)
Legacy route /our-team must 301-redirect to /about-us/team.
Legal: /privacy, /terms.

## Content
- Single source of truth: src/content/site.ts (adjust the path to the repo). Components read from it; no hard-coded copy.
- Contact details live once in siteConfig.contact and are reused everywhere.
- Exactly five products, in this order: Logbook Loan (up to KES 700,000) · Personal Secured Loan (up to KES 300,000) · Study Abroad Loan (tailored, no cap shown) · SME Loan (up to KES 300,000) · Insurance.
- The old Unsecured Personal / Unsecured Business / Top-Up products are retired. Remove every "no collateral required" claim.

## Rules
- Never invent facts: no rates, fees, licence numbers, branch counts, amounts disbursed, testimonials, success stories or partner logos unless they are in site.ts. Unknown items are `TODO(client)` in site.ts, and any section whose data is empty is hidden, not shown with placeholder text.
- Mobile-first and responsive (360 → 1440px), no horizontal scroll.
- Accessibility: semantic HTML, one h1 per page, alt text, visible focus, AA contrast, keyboard-operable menus, modals (focus trap, Escape to close) and accordions.
- Performance: next/image, no layout shift, Lighthouse mobile ≥ 90 in all four categories. Stats and key content must be server-rendered (never show "0" before JavaScript runs).
- Forms: zod validation on client and server, honeypot field, basic rate limit, Kenyan phone validation (07XXXXXXXX, 01XXXXXXXX or +2547/+2541…), consent checkbox linking to /privacy. Submissions are emailed to siteConfig.contact.email via Resend (RESEND_API_KEY); without the key, log the submission and show success in development.
- After every task: lint, type-check, run tests, `npm run build`; fix all errors. Then summarise what changed and list the files touched.
```

---

## PROMPT 1 — Audit against the reference (no code changes)

```
Read CLAUDE.md. Do NOT change any files yet.

1. Report our stack: Next.js version, App vs Pages Router, styling (Tailwind?), component/icon libraries, how metadata and images are handled.
2. Map our current routes and components.
3. Compare our site with the reference site's structure described in CLAUDE.md (top bar, nav dropdowns, About sub-pages, products overview + detail pages, careers, partners, media, FAQ, loan modal, WhatsApp button). List what we have, what is missing, and what must be removed (Top-Up, unsecured products, "no collateral" claims).
4. Confirm these known bugs and point to the code causing each:
   - canonical / og:url / og:image point to http://localhost:3000
   - footer email is info@luminouscrown.co.ke and is not a mailto: link
   - "&amp;" double-escaping in titles and alt text
   - three stray "A" text nodes in the hero
   - "Why borrowers choose us" list rendered twice
   - calculator says months on the slider but "years" in the helper text, and gives wrong totals
   - "next business day" contradicts "under 12/24 hours"
   - duplicated step numbering ("1. 01 Step 1")
5. Propose the file/folder plan for prompts 2–11 (new routes, components, content file shape). Wait for my go-ahead.
```

---

## PROMPT 2 — Brand foundation, content file and UI kit

```
Read CLAUDE.md. Build the foundation only (no page redesigns yet):

1. Colour tokens and fonts exactly as in CLAUDE.md (Tailwind theme or CSS variables). Replace old brand colours site-wide with the tokens.
2. Logos from /public/brand: blue lockup in the header (monogram on very small screens), white lockup on navy (footer). Alt text "Anchorstone Capital Limited".
3. Favicon, icon.png (512) and apple-icon.png (180) generated from logo_mono_blue.png on white.
4. Create src/content/site.ts from the CONTENT APPENDIX pasted below, with TypeScript types. Include: siteConfig, about (story, pillars, stats, expertise), mission, vision, motto, values, whyUs, products (with category, tagline, intro, expect, features, requirements, steps, faqs, idealFor), team (ceo + members), careers (intro, reasons, culture, roles: []), partners: [], partnerPitch, news: [], faqs, howItWorks.
5. Build a reusable UI kit (components/ui):
   Eyebrow · SectionHeading (eyebrow + title + optional intro) · Button (primary | secondary | ghost-light | link-arrow) · Card · IconBadge · Pill · NumberedList (01, 02…) · Steps (horizontal on desktop, vertical on mobile) · StatBand (server-rendered values, optional count-up animation that respects prefers-reduced-motion) · Accordion (accessible) · FilterChips · PageHero (navy band, eyebrow, h1, intro, monogram watermark, diagonal divider) · DiagonalDivider · Watermark · CTABand.
6. Add a /dev/ui page (excluded from the sitemap, noindex) that shows every component so I can review the style.

Build, fix errors, summarise.

[PASTE THE CONTENT APPENDIX FROM THE BOTTOM OF THIS FILE HERE]
```

---

## PROMPT 3 — Fix the existing bugs

```
Read CLAUDE.md. Fix every bug confirmed in the audit:

1. SITE_URL from process.env.NEXT_PUBLIC_SITE_URL (fallback https://anchorstone-capital-ltd.vercel.app) used for metadataBase, canonical, og:url, og:image. No localhost anywhere in production output.
2. Phone and email from siteConfig.contact, rendered as tel: and mailto: links everywhere.
3. Remove "&amp;" double-escaping (pass plain strings; let React escape).
4. Remove the stray "A" text nodes from the hero.
5. Render the features list once (if it's a marquee, mark the duplicate aria-hidden).
6. Loan calculator:
   - Product selector: Logbook (max 700,000, tenure 1–24 months), Personal Secured (max 300,000, 1–12 months), SME (max 300,000, 1–12 months).
   - Tenure in MONTHS everywhere.
   - Reducing-balance amortisation: r = annualRate/12/100; instalment = P·r / (1 − (1+r)^−n); total = instalment·n; interest = total − P; handle r = 0.
   - Show monthly instalment, total repayment and total interest as "KES 12,345".
   - Note under it: "Figures are indicative. Final terms depend on your application and our credit assessment."
   - Unit tests for the calculation (r = 0, 1-month, typical case).
7. Consistent timing copy: "Same-day approval for qualifying applicants" and "Funds disbursed in under 24 hours". Remove "next business day".
8. Show step numbers once.

Build, run tests, summarise.
```

---

## PROMPT 4 — Global layout: top bar, header, footer, loan modal, WhatsApp

```
Read CLAUDE.md. Build the site-wide layout, modelled on the reference site's structure:

1. TOP BAR (thin, navy): left "Licensed credit provider · Regulated by the Central Bank of Kenya"; right phone (tel:) and email (mailto:) with icons. On mobile, show only the phone and email icons.
2. HEADER (white, sticky, light shadow on scroll): logo left; nav exactly as in CLAUDE.md with dropdowns for About Us, Our Products and Media. The Our Products dropdown is a small mega-menu: 5 products, each with icon + one-line tagline, plus "View all products →". Primary button "Apply for a Loan →" opens the loan modal.
   Mobile: hamburger → full-height drawer with accordion sub-menus, focus trap, Escape to close, body scroll locked.
3. LOAN MODAL "Tell us what you need" (global, can be opened from any page via a context/hook, e.g. openLoanModal({ product })):
   Fields: full name, phone, amount requested (KES), product (the 4 lending products + Insurance enquiry), preferred contact time (Morning / Afternoon / Evening), email (optional), consent checkbox.
   Server action → email to siteConfig.contact.email; success state: "Thank you — our team will call you shortly." with reference number. Also accepts ?apply=logbook-loan in any URL to open the modal preset.
4. FLOATING WHATSAPP BUTTON (bottom-right, #25D366, accessible label "Chat with us on WhatsApp"): opens https://wa.me/<siteConfig.contact.whatsapp>?text=<prefilled enquiry>. Hide it while the modal is open. The WhatsApp number is TODO(client) in site.ts — if empty, don't render the button.
5. FOOTER (navy, monogram watermark):
   - Column 1: white logo, tagline "Anchored in trust. Built for progress.", short mission line, social icons (render only those with URLs in site.ts).
   - Column 2 "Explore": Home, About Us, Our Products, Partners, Careers, Media Centre, Download company profile (PDF).
   - Column 3 "Our Products": the 5 product links.
   - Column 4 "Contact": address, phone, email, office hours (hide if TODO), "CBK licensed credit provider".
   - Bottom bar: © {current year} Anchorstone Capital Ltd · Privacy Policy · Terms & Conditions.
6. Redirect /our-team → /about-us/team (301).

Build, summarise, and tell me which site.ts values are still TODO.
```

---

## PROMPT 5 — Home page

```
Read CLAUDE.md. Rebuild the home page (/) following the reference site's section order, with Anchorstone content from site.ts:

1. HERO (navy, monogram watermark, diagonal divider at the bottom), two columns on desktop:
   Left: eyebrow "Licensed by the Central Bank of Kenya"; tagline line "Anchored in trust. Built for progress."; h1 "Credit that moves you forward." (italicise "forward." in --on-navy); one-line intro; buttons "Apply for a Loan →" (modal) and "Explore our products" (#products); three quick-link chips with icons: "Unlock your logbook" · "Study abroad" · "Grow your business" → their product pages.
   Right: QUICK APPLY card (white, rounded): heading "Apply for a Loan", fields full name, phone, amount (KES), product, preferred contact time, consent; submit "Request a call back →". Same server action as the modal.
   On mobile the card sits below the text.
2. FEATURE HIGHLIGHTS: 4 icon cards — Fast Approval · Flexible Repayment · Keep Driving Your Car · Licensed & Regulated — plus a badge "42 years combined director experience".
3. OUR PRODUCTS (#products): eyebrow "Our Products", heading "Financial solutions for every goal.", "View all products →". Five cards: icon header on a tint/gradient panel, category tag, name, one line, amount pill, "Learn more →". Grid: 1 / 2 / 3 columns.
4. STATS BAND (navy): server-rendered — 42 yrs combined director experience · 5 credit & protection products · KES 700K maximum logbook loan · 24 hrs or less to disbursement for SME loans. Count-up animation only as enhancement.
5. LOAN CALCULATOR (from Prompt 3) with "Apply with these figures →" opening the modal preset with product/amount.
6. WHY CHOOSE ANCHORSTONE: heading "Your reliable financial partner.", 6 points from whyUs in a 2-column list with check icons, and a "Licensed by the Central Bank of Kenya" badge card.
7. MEET OUR CEO teaser: Selestine K. Mwanga photo (colour), title, 2-line summary, "Meet our CEO →" and "Meet the team →".
8. HOW IT WORKS: heading "Your next step, made clear.", 4 numbered steps — Choose a product · Apply · Get assessed · Receive funds — and "Read our FAQs →".
9. CLOSING CTA BAND (navy): tagline "Capital today. Progress tomorrow."; heading "Ready to move your plans forward?"; buttons "Apply for a Loan →" and "Talk to us" (/contact-us).

Do NOT add testimonials, success stories or branch maps (we have one office and no verified stories yet). Remove the old sections and stock-photo banner; reuse existing images in /public/images only where they fit (e.g. SME card). Build and summarise.
```

---

## PROMPT 6 — About section (5 pages, like the reference)

```
Read CLAUDE.md. Build the About section with a shared layout: PageHero + a sub-navigation bar of tabs (About Us · Vision & Mission · Core Values · Meet Our CEO · Meet the Team) that highlights the current page and scrolls horizontally on mobile. Every page ends with the CTABand.

1. /about-us — About Us
   - PageHero: eyebrow "About Us", h1 "Anchored in trust. Built for progress.", intro = about.lead.
   - OUR STORY: two columns — text (about.body) left; right a navy panel with the monogram and a large badge "42 yrs combined director experience".
   - THREE PILLARS (cards): Client First · Built for Speed · Responsible Growth (copy in site.ts).
   - CORE EXPERTISE row: Credit & risk management · Micro-lending · Legal & compliance.
   - LICENSED & REGULATED callout with landmark icon (licence number only if filled in site.ts).
   - Short previews linking to Vision & Mission, Core Values, Meet Our CEO, Meet the Team (4 link cards with arrows).
2. /about-us/vision-mission — Vision, Mission and Motto as three stacked labelled blocks (big serif statements), then the brand promise line "We lend the way we would want to borrow: clearly, quickly and with respect."
3. /about-us/core-values — 4 value cards with a large number (01–04), icon, name and description; then "Why we exist" centred paragraph (site.ts about.whyWeExist).
4. /about-us/ceo — eyebrow "Leadership", h1 "Meet Our CEO". Two columns: large colour portrait (4:5, rounded) left; right: role, name, summary. Below: Career highlights as a vertical timeline (current role tagged "Current"), Education list, and the vision quote in a pull-quote block. Link "Meet the team →".
5. /about-us/team — eyebrow "Our People", h1 "Meet the Team", subtitle "Experienced professionals providing direction, expertise and stewardship to Anchorstone Capital." Cards for each team member: colour photo (4:5), role label, name (h3), bio, credential pills. Grid of 2 on desktop, 1 on mobile; data-driven so new members can be added in site.ts only.

Per-page metadata; Organization JSON-LD on /about-us; Person JSON-LD on /about-us/ceo. Build and summarise.
```

---

## PROMPT 7 — Products overview and product pages

```
Read CLAUDE.md.

A. /products — Products overview (modelled on the reference):
   - PageHero: eyebrow "Our Products", h1 "Financial solutions for every goal.", intro line.
   - FILTER CHIPS that really filter the grid (client-side, URL ?category=): All · Personal · Vehicle · Education · Business · Protection.
   - Product cards: visual header (icon on tint/gradient panel, or an existing /public/images photo where it fits), category tag (e.g. "Vehicle-backed finance"), name, one line, "Typical requirements" checklist (first 3 items + "and more"), amount pill, two buttons "View product" (secondary) and "Apply →" (primary, opens modal preset; Insurance → "Get a quote").
   - Disclaimer: "Requirements are indicative and may vary by product and assessment."
   - Process strip: Choose · Apply · Assessment · Decision.

B. /products/[slug] — one statically generated page per product (generateStaticParams). Sections:
   1. HERO (navy→blue gradient, watermark): breadcrumb (Home / Products / Name), eyebrow category, h1 name, tagline, amount pill, buttons "Apply for <Name> →" (modal preset) and "Talk to us"; large icon in a circle on the right.
   2. INTRO: h2 "Designed around your goals." + product intro.
   3. WHAT TO EXPECT: 5 check-icon points (product.expect) beside a "Start your application" card (amount + phone + "Apply now →", same server action).
   4. KEY FEATURES: feature cards (product.features).
   5. TYPICAL REQUIREMENTS: eyebrow "Application checklist", NumberedList 01–05, note "Final requirements may vary after assessment."
   6. HOW IT WORKS: 4 steps — Apply · Review · Approve · Disburse (Insurance: Enquire · Assess · Quote · Cover).
   7. FAQs for this product (Accordion, from product.faqs) + FAQPage JSON-LD.
   8. IDEAL FOR strip.
   9. RELATED PRODUCTS: the other 4 as small cards.
   10. CTABand.
   Metadata: title "Logbook Loan in Kenya — up to KES 700,000 | Anchorstone Capital", description from intro; FinancialProduct JSON-LD.

Build and summarise.
```

---

## PROMPT 8 — Careers page

```
Read CLAUDE.md. Build /careers (modelled on the reference, improved):

1. PageHero: eyebrow "Careers", h1 "Build a career that moves people forward.", intro from site.ts careers.intro, buttons "View opportunities ↓" (#openings) and "Send your CV" (#apply).
2. WHY WORK WITH US: 3 value cards (careers.reasons): Grow with responsibility · Move with pace and discipline · Put people first.
3. LIFE AT ANCHORSTONE: 3 alternating text/visual blocks (careers.culture). Use brand panels with icons until real team photos exist — no stock photos of strangers presented as staff.
4. OPEN OPPORTUNITIES (#openings): list from careers.roles (title, department, location, type, deadline, short summary, "Apply →" which preselects the role in the form). If roles is empty, show one card "General Talent Pool — we're always keen to hear from strong people in credit, risk, sales, finance, customer experience, operations and digital."
5. APPLICATION FORM (#apply): full name, email, phone, role / area of interest (select from roles + "General Talent Pool"), LinkedIn URL (optional), CV upload (PDF or DOCX, max 5 MB, validated on client and server), short cover note (max 1,000 characters), consent checkbox (privacy notice covers recruitment data).
   Server action → email to siteConfig.contact.careersEmail (fallback contact.email) with the CV attached (Resend attachment). Success state with reference number. Never store CVs in the repo or public folder.
6. Note at the bottom: "Anchorstone Capital will never ask for payment at any stage of recruitment."
7. JobPosting JSON-LD for each open role (only when roles exist).

Build and summarise.
```

---

## PROMPT 9 — Partners, Media Centre, FAQ, Contact

```
Read CLAUDE.md.

A. /partners
   - PageHero: eyebrow "Partners", h1 "Partnering for progress."
   - "Who we work with" intro + 4 partner types as cards (site.ts partnerPitch): Insurance underwriters · Motor dealers & valuers · Education agents & institutions · Employers & SACCOs.
   - Partner logo grid from site.ts partners (hidden when empty).
   - "Become a partner" form: organisation, contact name, email, phone, partner type, message, consent → email.
B. /media — Media Centre
   - PageHero: eyebrow "Newsroom", h1 "Media Centre".
   - News & announcements list from site.ts news (card: date, title, summary, optional image/link). Empty state: "News and announcements will appear here."
   - Press enquiries block (contact details) + "Download company profile (PDF)" button → /brand/Anchorstone_Capital_Company_Profile.pdf.
C. /faq
   - PageHero: eyebrow "Help Centre", h1 "Frequently Asked Questions".
   - Category tabs (General · Applying · Logbook · Study Abroad · SME · Insurance) and Accordion lists from site.ts faqs; FAQPage JSON-LD.
   - "Still have questions?" contact banner.
D. /contact-us
   - PageHero: eyebrow "Contact Us", h1 "Talk to us."
   - Two columns: contact cards (visit, call, email, WhatsApp, office hours — hide TODO items) + contact form (name, phone, email, topic with ?topic= preselect, message, consent).
   - Lazy-loaded Google Maps embed for "Kofisi, Westlands, Nairobi".

Build and summarise.
```

---

## PROMPT 10 — Apply page and legal pages

```
Read CLAUDE.md.

1. /apply-loan — full application page (for people who want to give more detail than the modal):
   - Stepper with 3 steps: (1) Product & amount — product cards to choose from, amount (respect max; Study Abroad has no max), tenure in months; (2) Your details — full name, national ID number, phone, email, county, employment or business type, monthly income range; (3) Review & submit — summary + consent to credit check and privacy notice.
   - Side panel shows the chosen product's "Typical requirements" list.
   - Prefill from ?product=&amount=&tenure= (calculator / modal links).
   - Server action → email summary; success screen with reference number and "What happens next" (3 steps).
2. /privacy — Privacy Policy aligned with the Kenya Data Protection Act, 2019 (what we collect from loan, contact, partner and careers forms; purpose; retention; rights; contact). Mark the whole page TODO(client) for legal review in site.ts, but render the draft.
3. /terms — Terms & Conditions draft, same approach.

Build and summarise.
```

---

## PROMPT 11 — SEO, performance and QA

```
Read CLAUDE.md.

1. Per-page titles and descriptions (Kenya-focused keywords: logbook loans Kenya, SME loans Kenya, study abroad loans Kenya, personal secured loan Nairobi).
2. Branded Open Graph image (1200×630, navy background, white logo, headline) via the opengraph-image convention; sitemap.xml (exclude /dev/*), robots.txt.
3. JSON-LD: Organization + FinancialService (LocalBusiness) on home; others as added in earlier prompts.
4. Branded 404 and error pages.
5. QA at 360, 768, 1024 and 1440px: every page, every dropdown, modal, accordion, filter and form (success and error states). Tab through every page with the keyboard. Check all internal links. No console errors.
6. Lighthouse mobile on /, /products, /products/logbook-loan, /about-us, /careers — fix anything under 90.

Report the Lighthouse scores and anything left to fix.
```

---

## PROMPT 12 — Domain switch (once anchorstone.com is live)

```
Read CLAUDE.md. The new domain is live.

1. In site.ts set siteConfig.url = "https://anchorstone.com" and contact.email = "info@anchorstone.com" (ask me to confirm the exact mailbox and careers mailbox first).
2. Tell me to set NEXT_PUBLIC_SITE_URL=https://anchorstone.com in Vercel → Settings → Environment Variables (Production), plus RESEND_API_KEY, and to verify the domain in Resend (it will give DNS records to add at HostPinnacle).
3. Search the repo for "luminouscrown", "luminous", "vercel.app" and "localhost" and remove/replace every occurrence.
4. Confirm canonical, sitemap and OG URLs use the new domain.
5. Give me the Vercel domain steps (add anchorstone.com + www, redirect www → apex) and the DNS records to add in HostPinnacle.

Build and summarise.
```

---

## CONTENT APPENDIX — ADDITIONS FOR PACK 2 (paste together with the base appendix below)

```
TAGLINES
- Primary: Anchored in trust. Built for progress.
- Hero h1: Credit that moves you forward.
- Closing band: Capital today. Progress tomorrow.
- Motto: Anchored in trust. Built for progress.
- Brand promise: We lend the way we would want to borrow: clearly, quickly and with respect.

ABOUT — PILLARS
- Client First — Every product and decision starts with what the client actually needs and can comfortably repay.
- Built for Speed — Quick assessments, same-day approvals for qualifying applicants and fast disbursement.
- Responsible Growth — We grow by lending prudently, transparently and within the rules set by the Central Bank of Kenya.
ABOUT — WHY WE EXIST
- Access to fair credit changes what people can do: keep a business running, send a child to study abroad, or turn a vehicle into working capital. We exist to make that access simple, fast and honest.

PRODUCT EXTRAS
- Categories/tags: Logbook Loan = Vehicle ("Vehicle-backed finance") · Personal Secured Loan = Personal ("Salary-based finance") · Study Abroad Loan = Education ("Education finance") · SME Loan = Business ("Working capital") · Insurance = Protection ("Cover & protection")
- Taglines:
  Logbook Loan — Finance your plans with your logbook while you keep driving your car.
  Personal Secured Loan — Fast, fair credit for salaried individuals.
  Study Abroad Loan — Fund tuition, visa and travel for studies overseas.
  SME Loan — Working capital that keeps your business moving.
  Insurance — Protection for you, your vehicle, your loan and your business.
- What to expect (all lending products): Guidance from a dedicated officer · Clear application requirements · Fair credit and affordability assessment · Transparent documentation and terms · Support until your final repayment
- Product FAQs (answers must stay general — no rates or fees):
  Logbook: Can I keep using my car? — Yes. You keep driving your vehicle throughout the loan; the logbook is held as security. · How much can I borrow? — Up to KES 700,000, depending on the vehicle's valuation and your ability to repay. · How fast is approval? — Qualifying applications can be approved the same day once valuation and documents are complete.
  Personal Secured: Who qualifies? — Employed individuals with a regular, verifiable income. · How much can I borrow? — Up to KES 300,000, based on your income and repayment capacity. · How long can I take to repay? — Up to 12 months.
  Study Abroad: What does it cover? — Tuition, visa and travel costs, tailored to your programme. · Who applies — the student or the sponsor? — Either; the sponsor's income is assessed. · Is there a maximum amount? — The amount is tailored to your study plan and repayment capacity.
  SME: What documents do I need? — Business registration, ID and KRA PIN of the owner(s), 6 months' bank statement, 1-year M-Pesa statement and Till/Paybill statements. · How fast are funds disbursed? — In under 24 hours once approved. · Can I top up later? — Yes, subject to your repayment history.
  Insurance: Which covers do you arrange? — Motor, credit life, business and stock, health and personal accident cover through licensed insurance partners. · Do I need a loan with you to get cover? — No, but we can bundle cover with your financing.

GENERAL FAQS
- How do I apply? — Use the Apply for a Loan form, call us or visit our Westlands office. An officer will contact you to guide you.
- How long does it take? — Qualifying applications can be approved the same day; SME loans are disbursed in under 24 hours once approved.
- What documents do I need? — Each product page lists its typical requirements; final requirements may vary after assessment.
- Can I apply from outside Nairobi? — Yes. Start online or by phone and our team will guide you through the next steps.
- Are you licensed? — Yes. Anchorstone Capital Limited is licensed by the Central Bank of Kenya as a credit provider.
- How do you use my personal data? — Only to process your application and contact you, in line with the Kenya Data Protection Act, 2019. See our Privacy Policy.

CAREERS
- Intro: We're a growing team building practical, transparent financial solutions for individuals and businesses across Kenya. If you take ownership, move with pace and care about the people you serve, we'd like to hear from you.
- Reasons: Grow with responsibility — Own your work, learn fast and see the impact on real clients. · Move with pace and discipline — We value speed, rigour, collaboration and continuous improvement. · Put people first — Serve clients and colleagues with professionalism, respect and a solutions mindset.
- Culture blocks: Professional and accountable · Fast and collaborative · Client-centred
- Roles: [] (empty → General Talent Pool card)
- careersEmail: TODO(client) (fallback to contact email)

PARTNER PITCH
- Insurance underwriters — Protection products for our borrowers.
- Motor dealers & valuers — Vehicle valuation and logbook-backed financing for buyers.
- Education agents & institutions — Study abroad financing for admitted students.
- Employers & SACCOs — Salary-based credit for staff and members.

CONTACT EXTRAS
- whatsapp: TODO(client) (international format, e.g. 2547XXXXXXXX)
- officeHours: TODO(client)
- socials: { facebook, x, linkedin, instagram, youtube } all TODO(client)
```

---

## CONTENT APPENDIX — BASE (paste into Prompt 2 together with the additions above)

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
