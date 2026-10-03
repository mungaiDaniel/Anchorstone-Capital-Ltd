# Motion system

One motion language for the whole site: same easing, durations, glow and depth everywhere.
Live review page: **`/motion-demo`** (temporary, `noindex`).

## The one dial

`src/lib/motion.ts` → `MOTION_INTENSITY`

| Value | Feel |
| ----- | ---- |
| `0`   | Static (everything still, like reduced motion) |
| `0.6` | Calm |
| `1`   | Default |
| `1.4` | Energetic |

It scales reveal distances, parallax travel, tilt angle, magnetic pull, marquee/aurora speed and
the home hero's 3D speed and parallax. Finer controls live in the same file: `ease`, `duration`,
`spring`, `stagger`, `distance`, `effect`, `viewport`. The root layout writes the CSS-relevant tokens
onto `<html>` as `--motion-*` variables, so CSS animations use the same numbers.

## Rules the system enforces

- **Never hides content without JS.** Server HTML is always fully visible (and indexable). After
  hydration, only elements still *below the fold* get `.reveal-pending`; they get `.reveal-in` once,
  when scrolled into view. On-load animations (`trigger="load"`) are pure CSS and always end visible.
- **Reduced motion:** reveals become quick fades; parallax, tilt, magnetic, cursor, marquee, aurora
  drift and Lenis smooth scroll are off; the hero renders one static 3D frame.
- **Transform + opacity only** (plus a short blur on blur-in/SplitText). No layout-shifting animation.
- **Mobile:** no cursor effects, parallax at `MOBILE_FACTOR` (0.5), lighter hero, decor hidden.

## Primitives — `src/components/motion/`

| Component | What it does | Props |
| --------- | ------------ | ----- |
| `<Reveal>` | Fade + move into place, once | `variant`: `up` \| `left` \| `right` \| `scale` \| `blur` · `delay` (s) · `y` (px override) · `trigger`: `scroll` \| `load` · `as` |
| `<StaggerGroup>` / `<StaggerItem>` | Children enter one after another | Group: `variant`, `step` (s), `delay`, `as` (`div`/`ul`/`ol`) · Item: `as` (`div`/`li`/`article`) |
| `<SplitText>` | Word-by-word or line-by-line blur-to-sharp | `text` (string or string[] for lines) · `mode`: `words` \| `lines` · `trigger`: `load` (titles) \| `scroll` · `delay` · `as` · `unitClassName` |
| `<CountUp>` | Counts up when in view; server renders the final value | `value` · `prefix` · `suffix` · `duration` — **real figures only** |
| `<Parallax>` | Content moves at a different speed while scrolling | `speed` (0.5 gentle, 1 strong, negative = opposite) |
| `<Magnetic>` | Element drifts toward the cursor (desktop) | `strength` |
| `<TiltCard>` | 3D tilt toward the cursor + moving light highlight (desktop) | `glare` · `strength` |
| `<Marquee>` | Infinite strip (CSS), pauses on hover; static list with reduced motion | `items` · `seconds` · `gap` · `fadeEdges` |
| `<DrawLine>` | Line or SVG path draws itself — once in view, or scrubbed with scroll | `path` (viewBox 1000×120) · `scrub` · `strokeClassName` · `strokeWidth` · `delay` |
| `<PageTransition>` | Navy wipe + rise between routes (used by `app/template.tsx`) | — |
| `<ScrollProgress>` | Lavender progress bar at the top (root layout) | — |
| `<CustomCursor>` | Soft ring trailing the cursor, grows over links (desktop, root layout) | Add `data-cursor` to any element to make it "interactive" |
| `<SmoothScroll>` | Lenis smooth scrolling (root layout) | — |

Hooks: `useScrollReveal(ref)` (the shared reveal engine) · `usePointerEffects()` (true on desktop with motion allowed) · `useMediaQuery(query)` in `src/lib`.

## Effects — `src/components/effects/`

| Component | What it does | Props |
| --------- | ------------ | ----- |
| `<AuroraBackground>` | Slow-moving blurred navy/lavender blobs (CSS) | `tone`: `dark` \| `light` |
| `<GridGlow>` | Faint grid; a glow follows the cursor across the parent | `tone` · `cell` (px) |
| `<NoiseOverlay>` | Film grain (inline SVG, no request) | `opacity` |
| `<WaveRibbon>` | Calm SVG version of the hero's wave ribbon (no WebGL) | `tone` · `height` |
| `<FloatingDecor>` | CSS coin / glass sphere / anchor stone, bobbing with parallax | `kind`: `coin` \| `glass` \| `stone` · `size` · `speed` · `delay` · `showOnMobile` |
| `<GlassCard>` | Frosted card, fine border, brand glow on hover | `tone` · `interactive` · `as` |

Utilities in `globals.css`: `.link-draw` (underline draws in on hover/focus).

## Sections built on the system

- `src/components/hero/` — the home hero (WebGL). Its own knobs are in `hero/config.ts`; speed and
  parallax follow `MOTION_INTENSITY`.
- `src/components/sections/PageHeader.tsx` — compact animated header for inner pages (aurora + grid glow
  + wave ribbon + grain + split-text title + decor). Ready to replace `PageHero` page by page.
