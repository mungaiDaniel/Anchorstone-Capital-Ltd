# Anchorstone Capital Ltd — website

Marketing site for Anchorstone Capital Ltd (formerly branded "Luminous Crown"), rebuilt page by page from the original WordPress site.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 — design tokens live in `src/app/globals.css` (`@theme`)
- Motion (`motion/react`) + a shared motion system — see **MOTION.md** (one `MOTION_INTENSITY` dial)
- three.js + React Three Fiber for the home hero only (lazy, loads on first interaction, GPU-only)
- Lenis smooth scrolling (disabled for `prefers-reduced-motion`)
- `next/font`: JetBrains Mono (headings, labels, numbers, buttons) + Inter (body)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Environment variables:

- `NEXT_PUBLIC_SITE_URL` — production domain (canonical / Open Graph URLs).
- `NEXT_PUBLIC_LOAN_APPLICATION_ENDPOINT` — where the Apply Loan form POSTs (multipart/form-data).
  Until it is set nothing is sent: submissions are simulated in development and show an
  "unavailable" message in production. All submit logic lives in `src/lib/apply/submit.ts`.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` — where the Contact Us form POSTs (same behaviour; `src/lib/contact/submit.ts`).

## Structure

```
src/
  app/                 routes, root layout, template.tsx (page transition), globals.css (tokens)
  components/
    layout/            Navbar, Footer, Wordmark (swap in a logo here later)
    motion/            Reveal, Stagger, CountUp, DrawLine (Motion via LazyMotion — use `m.*`, not `motion.*`)
    providers/         Lenis + MotionConfig
    sections/          page sections (home/, plus shared ones like CtaBand)
    ui/                Container, buttons, cards, section headings
  content/             page copy as data (e.g. loans.ts — reused by Home and the Apply form)
  lib/site.ts          site name, navigation, contact details (single source of truth)
public/images/         optimised, self-hosted imagery — see ASSETS.md
```

## Conventions

- Never hardcode colours: use token utilities (`bg-brand-900`, `bg-lavender-50`, `text-ink-600` …).
- Content comes only from the original site. Missing facts are marked `TODO(content)` — search for `TODO(` to list them.
- Every image is recorded in `ASSETS.md` with source, photographer and licence.
