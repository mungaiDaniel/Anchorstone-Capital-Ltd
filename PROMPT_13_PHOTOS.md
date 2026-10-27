# PROMPT 13 — Source and add high-quality photos

Paste everything inside the code block below into Claude Code. Run it **after Prompts 5–9** so the pages that need photos already exist. It is safe to run earlier: Claude will only source photos and create the review page, and will wire in only what exists.

**Before you run it (5 minutes, free):**
1. Create a free Unsplash developer account → https://unsplash.com/developers → "New Application" → copy the **Access Key**.
2. Create a free Pexels API key → https://www.pexels.com/api/ → copy the **API key**.
3. Add both to `.env.local` (never commit this file):
   ```
   UNSPLASH_ACCESS_KEY=your_key_here
   PEXELS_API_KEY=your_key_here
   ```
   The keys are only used by a local script on your computer. They are not used by the website.

---

```
Read CLAUDE.md. Task: source, process and add high-quality, properly licensed photos to the site. Work in the phases below and STOP after Phase 3 for my approval before wiring anything into pages.

## Hard rules
1. Sources: ONLY Unsplash (unsplash.com) and Pexels (pexels.com). Both allow free commercial use without permission. Use their official APIs with UNSPLASH_ACCESS_KEY and PEXELS_API_KEY from .env.local. If a key is missing, tell me and use the other source.
2. NEVER use, download, trace or imitate any image from spectrumcredit.co.ke or any other competitor/lender website. Do not search those sites. Skip any photo that appears on a Kenyan lender's or bank's site if you notice it.
3. People: Black African / East African people in realistic, modern Kenyan or urban African settings (Nairobi-style offices, shops, markets, campuses, roads). Natural, confident, professional. No cheesy staged poses, no "thumbs up", no fake handshakes over money piles, no cash fanned out.
4. Quality: landscape, minimum 2400px on the long edge (portrait shots 1600px+), sharp, well lit, no watermarks, no text overlays, no visible brand logos or readable number plates (if a good car photo shows a plate, blur it during processing), no other company's branding on shirts or signs.
5. Honesty: stock people must never be presented as Anchorstone staff, clients or success stories. No captions like "our client Jane". The only real people on the site are the team photos in /public/brand/team.
6. Visual consistency: prefer warm natural light and a calm, premium look that sits well next to our navy (#0B1050) and blue (#1C24A0). Avoid images dominated by orange, red or green.

## Phase 1 — Shot list
Find 3 candidates for each slot (search terms are starting points; refine as needed):
| Slot id | Used on | What it should show | Suggested searches |
|---|---|---|---|
| home-hero | Home hero (behind navy overlay, right/left crop safe) | Confident African professional or Nairobi skyline/business district at golden hour | "Nairobi skyline", "African businessman city", "Kenyan professional woman office" |
| logbook | Logbook Loan card + page hero | Person with their car: keys in hand, standing by a car, or driving in the city | "African man car keys", "Black woman driving car city", "car owner Africa" |
| personal-secured | Personal Secured Loan | Salaried professional at work or planning finances at home with a laptop/phone | "African professional laptop office", "Black woman budgeting laptop home" |
| study-abroad | Study Abroad Loan | African student with backpack at airport or on a university campus; graduation | "African student airport", "Black student university campus", "African graduation" |
| sme | SME Loan | Small business owner in their shop, tailor, salon, hardware or market stall | "Kenyan shop owner", "African tailor workshop", "African small business owner" |
| insurance | Insurance | Family at home, or person reviewing documents calmly; protected car/home | "African family home", "Black family car", "African couple documents" |
| about-story | About Us — Our Story | Team meeting / advisory conversation in a modern office | "African business meeting office", "Black professionals discussion" |
| about-values | Core Values / Vision page | Two people in a respectful advisory conversation across a desk | "financial advisor African client", "consultation office Africa" |
| how-it-works | Home "How it works" or Apply page | Person applying on a phone or laptop | "African woman smartphone", "Black man laptop applying online" |
| careers-hero | Careers hero | Diverse African team collaborating | "African team office collaboration", "young African professionals" |
| careers-culture-1/2/3 | Careers culture blocks | (1) focused work, (2) teamwork/whiteboard, (3) helping a customer on the phone | "African office teamwork", "call centre Africa headset", "African professionals whiteboard" |
| partners | Partners page | Two professionals meeting / partnership (no money in shot) | "African business partners meeting" |
| media | Media Centre header | Newspaper/laptop/press setting, or Nairobi city | "Nairobi city street", "business news laptop" |
| contact | Contact page | Nairobi Westlands / modern office reception | "Nairobi Westlands", "modern office reception Africa" |
| cta-band | Closing CTA band background (under navy overlay) | Wide, calm city or road at dusk | "Nairobi expressway dusk", "African city dusk" |

Avoid reusing the same photographer more than 3 times across the whole set, and no two slots with near-identical images.

## Phase 2 — Download and process
1. Write a script scripts/fetch-photos.mjs (Node, run locally; dependencies: sharp, dotenv) that:
   - Queries the Unsplash and Pexels APIs for each slot (orientation=landscape, per_page 15), filters by size, and downloads the top 3 candidates per slot into /photo-candidates/<slot>/ (add /photo-candidates to .gitignore).
   - For Unsplash, follows the API guidelines: download via the photo's links.download_location endpoint (to register the download) and hotlink-free local copies are fine for a website; keep the photographer name and profile URL.
   - Saves a candidates.json with: slot, source, photo id, page URL, photographer name, photographer URL, licence ("Unsplash License" / "Pexels License"), original size, description.
2. Process with sharp into /photo-candidates/<slot>/processed/:
   - Smart-crop (sharp attention strategy) to the aspect each slot needs: heroes and bands 16:9 (2400×1350); cards 4:3 (1200×900); careers culture 4:5 (1000×1250).
   - Export WebP (quality 78) and AVIF (quality 55); strip EXIF/GPS metadata.
   - Keep each file under 350 KB (heroes) / 200 KB (others); lower quality slightly if needed.
   - Blur any readable number plates or third-party logos you can see (describe what you blurred).

## Phase 3 — Review page (then STOP)
Create /dev/photos (noindex, excluded from sitemap) showing every slot with its 3 candidates side by side, each with: preview, source, photographer, licence, size in KB, and a preview of how it looks under our navy overlay (for hero/band slots). Then STOP and ask me to pick one per slot (e.g. "home-hero: 2, logbook: 1 …"). Do not continue until I reply.

## Phase 4 — Wire in my choices (after I approve)
1. Move chosen files to /public/images/<slot>.webp and .avif (delete unused candidates locally).
2. Add an images map to src/content/site.ts: { slot, src, alt, width, height, credit: { name, url, source } }. Alt text must describe the scene plainly (e.g. "Woman holding car keys beside her car") — never imply the person is an Anchorstone client or employee.
3. Use next/image everywhere with width/height, sizes, and placeholder="blur" (generate blurDataURL in the script). Heroes: priority on the home hero only; everything else lazy.
4. Hero and CTA band images sit under a navy gradient overlay (from rgba(11,16,80,.92) to rgba(11,16,80,.55)) so white text stays AA-contrast; keep the monogram watermark on top.
5. Product cards and product page heroes use their slot image; if an image is missing, fall back to the existing icon-on-tint panel.
6. Replace the old images in /public/images that we no longer use (personal-loan-professionals-laptops, business-loan-shop-owner, top-up-loan-man-phone-street, couple-smartphone-together) — remove them only if nothing references them.
7. Create IMAGE_CREDITS.md in the repo root listing every photo used: slot, photographer, profile URL, photo page URL, source and licence. Also add a small "Photo credits" link in the footer that opens /credits, a simple page rendered from the same data.
8. Check: no layout shift, Lighthouse mobile performance still ≥ 90 on /, /products and /careers, all images have alt text.

Build, summarise, and list every image now on the site with its page.
```
