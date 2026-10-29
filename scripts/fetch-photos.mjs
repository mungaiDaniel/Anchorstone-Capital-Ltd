/**
 * Photo sourcing for the Anchorstone site (Prompt 13, phases 1–3).
 *
 *   node scripts/fetch-photos.mjs            # all slots
 *   node scripts/fetch-photos.mjs logbook sme  # only these slots
 *
 * Needs UNSPLASH_ACCESS_KEY and/or PEXELS_API_KEY in .env.local (used only by this local script).
 * Sources are ONLY Unsplash and Pexels (free commercial licences). Never point this at any other site.
 *
 * Output:
 *   photo-candidates/<slot>/original-N.jpg      full-size downloads (gitignored)
 *   public/photo-candidates/<slot>/N.webp|avif  processed previews for /dev/photos (gitignored)
 *   public/photo-candidates/candidates.json     credits + metadata for every candidate (gitignored)
 */
import "dotenv/config";
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

dotenv.config({ path: ".env.local" });

const UNSPLASH = process.env.UNSPLASH_ACCESS_KEY;
const PEXELS = process.env.PEXELS_API_KEY;
if (!UNSPLASH && !PEXELS) {
  console.error("No API keys found. Add UNSPLASH_ACCESS_KEY and/or PEXELS_API_KEY to .env.local (see PROMPT_13_PHOTOS.md).");
  process.exit(1);
}
if (!UNSPLASH) console.warn("UNSPLASH_ACCESS_KEY missing — using Pexels only.");
if (!PEXELS) console.warn("PEXELS_API_KEY missing — using Unsplash only.");

/** Output formats. cap = max file size in KB for each of WebP/AVIF. */
const FORMATS = {
  hero: { w: 2400, h: 1350, cap: 350, minLong: 2400 },
  card: { w: 1200, h: 900, cap: 200, minLong: 2400 },
  tall: { w: 1000, h: 1250, cap: 200, minLong: 2400 },
};

const SLOTS = [
  { id: "home-hero", fmt: "hero", used: "Home hero", q: ["Nairobi skyline", "African businessman city", "Kenyan professional woman office"] },
  { id: "logbook", fmt: "card", used: "Logbook Loan", q: ["African man car keys", "Black woman driving car city", "car owner Africa"] },
  { id: "personal-secured", fmt: "card", used: "Personal Secured Loan", q: ["African professional laptop office", "Black woman budgeting laptop home"] },
  { id: "study-abroad", fmt: "card", used: "Study Abroad Loan", q: ["African student airport", "Black student university campus", "African graduation"] },
  { id: "sme", fmt: "card", used: "SME Loan", q: ["Kenyan shop owner", "African tailor workshop", "African small business owner"] },
  { id: "insurance", fmt: "card", used: "Insurance", q: ["African family home", "Black family car", "African couple documents"] },
  { id: "about-story", fmt: "card", used: "About Us — Our Story", q: ["African business meeting office", "Black professionals discussion"] },
  { id: "about-values", fmt: "card", used: "Core Values / Vision", q: ["financial advisor African client", "consultation office Africa"] },
  { id: "how-it-works", fmt: "card", used: "How it works / Apply", q: ["African woman smartphone", "Black man laptop applying online"] },
  { id: "careers-hero", fmt: "hero", used: "Careers hero", q: ["African team office collaboration", "young African professionals"] },
  { id: "careers-culture-1", fmt: "tall", used: "Careers culture 1 (focused work)", q: ["African office focused work laptop"] },
  { id: "careers-culture-2", fmt: "tall", used: "Careers culture 2 (teamwork)", q: ["African professionals whiteboard", "African office teamwork"] },
  { id: "careers-culture-3", fmt: "tall", used: "Careers culture 3 (helping a customer)", q: ["call centre Africa headset", "African customer service phone"] },
  { id: "partners", fmt: "hero", used: "Partners", q: ["African business partners meeting"] },
  { id: "media", fmt: "hero", used: "Media Centre", q: ["Nairobi city street", "business news laptop"] },
  { id: "contact", fmt: "hero", used: "Contact", q: ["Nairobi CBD", "modern office reception Africa"] },
  { id: "cta-band", fmt: "hero", used: "Closing CTA band", q: ["Nairobi expressway dusk", "African city dusk"] },
];

const only = process.argv.slice(2);
const slots = only.length ? SLOTS.filter((s) => only.includes(s.id)) : SLOTS;

const ORIG_DIR = "photo-candidates";
const PUB_DIR = "public/photo-candidates";
const PER_PHOTOGRAPHER_MAX = 3;

const photographerCount = new Map();
const usedIds = new Set();

async function json(url, headers) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url.split("?")[0]}`);
  return res.json();
}

async function searchUnsplash(query) {
  if (!UNSPLASH) return [];
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15&content_filter=high`;
  const data = await json(url, { Authorization: `Client-ID ${UNSPLASH}`, "Accept-Version": "v1" });
  return data.results.map((p) => ({
    source: "Unsplash",
    licence: "Unsplash License",
    id: p.id,
    width: p.width,
    height: p.height,
    pageUrl: p.links.html,
    photographer: p.user.name,
    photographerUrl: p.user.links.html,
    description: p.description || p.alt_description || "",
    // Unsplash guideline: register the download via links.download_location before using the file.
    resolveDownload: async () => {
      const { url: fileUrl } = await json(p.links.download_location, { Authorization: `Client-ID ${UNSPLASH}` });
      return `${fileUrl}${fileUrl.includes("?") ? "&" : "?"}w=3200&q=85&fm=jpg`;
    },
  }));
}

async function searchPexels(query) {
  if (!PEXELS) return [];
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`;
  const data = await json(url, { Authorization: PEXELS });
  return data.photos.map((p) => ({
    source: "Pexels",
    licence: "Pexels License",
    id: String(p.id),
    width: p.width,
    height: p.height,
    pageUrl: p.url,
    photographer: p.photographer,
    photographerUrl: p.photographer_url,
    description: p.alt || "",
    resolveDownload: async () => `${p.src.original}?auto=compress&cs=tinysrgb&w=3200`,
  }));
}

/** Interleave sources so both contribute, then filter by size, uniqueness and photographer cap. */
function pick(results, fmt, n = 3) {
  const bySource = { Unsplash: [], Pexels: [] };
  for (const r of results) bySource[r.source].push(r);
  const merged = [];
  for (let i = 0; i < Math.max(bySource.Unsplash.length, bySource.Pexels.length); i++) {
    if (bySource.Unsplash[i]) merged.push(bySource.Unsplash[i]);
    if (bySource.Pexels[i]) merged.push(bySource.Pexels[i]);
  }
  const chosen = [];
  const seen = new Set();
  for (const r of merged) {
    const key = `${r.source}:${r.id}`;
    if (seen.has(key) || usedIds.has(key)) continue;
    if (Math.max(r.width, r.height) < fmt.minLong || r.width < r.height) continue; // landscape, ≥ min long edge
    if ((photographerCount.get(r.photographerUrl) ?? 0) >= PER_PHOTOGRAPHER_MAX) continue;
    seen.add(key);
    chosen.push(r);
    if (chosen.length === n) break;
  }
  for (const r of chosen) {
    usedIds.add(`${r.source}:${r.id}`);
    photographerCount.set(r.photographerUrl, (photographerCount.get(r.photographerUrl) ?? 0) + 1);
  }
  return chosen;
}

/** Encode under the size cap by stepping quality down a little if needed. Metadata (EXIF/GPS) is stripped by default. */
async function encode(pipeline, format, startQuality, capKb) {
  let q = startQuality;
  for (;;) {
    const buf = await pipeline.clone()[format](format === "webp" ? { quality: q } : { quality: q, effort: 4 }).toBuffer();
    if (buf.length <= capKb * 1024 || q <= 40) return { buf, q };
    q -= 4;
  }
}

async function processPhoto(srcFile, outBase, fmt) {
  const base = sharp(srcFile).rotate().resize(fmt.w, fmt.h, { fit: "cover", position: sharp.strategy.attention });
  const webp = await encode(base, "webp", 78, fmt.cap);
  const avif = await encode(base, "avif", 55, fmt.cap);
  await fs.writeFile(`${outBase}.webp`, webp.buf);
  await fs.writeFile(`${outBase}.avif`, avif.buf);
  const blur = await sharp(srcFile).rotate().resize(16, Math.round((16 * fmt.h) / fmt.w), { fit: "cover" }).webp({ quality: 40 }).toBuffer();
  return {
    webpKb: Math.round(webp.buf.length / 1024),
    avifKb: Math.round(avif.buf.length / 1024),
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    width: fmt.w,
    height: fmt.h,
  };
}

async function main() {
  await fs.mkdir(PUB_DIR, { recursive: true });
  const manifestPath = path.join(PUB_DIR, "candidates.json");
  let manifest = [];
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch {}
  manifest = manifest.filter((c) => !slots.some((s) => s.id === c.slot));

  for (const slot of slots) {
    const fmt = FORMATS[slot.fmt];
    console.log(`\n▸ ${slot.id} (${slot.fmt} ${fmt.w}×${fmt.h})`);
    const results = [];
    for (const q of slot.q) {
      try {
        results.push(...(await searchUnsplash(q)), ...(await searchPexels(q)));
      } catch (err) {
        console.warn(`  search failed for "${q}": ${err.message}`);
      }
    }
    const chosen = pick(results, fmt);
    if (chosen.length < 3) console.warn(`  only ${chosen.length} candidate(s) met the size/uniqueness rules`);

    await fs.mkdir(path.join(ORIG_DIR, slot.id), { recursive: true });
    await fs.mkdir(path.join(PUB_DIR, slot.id), { recursive: true });

    let n = 0;
    for (const c of chosen) {
      n += 1;
      try {
        const fileUrl = await c.resolveDownload();
        const res = await fetch(fileUrl);
        if (!res.ok) throw new Error(`download ${res.status}`);
        const orig = path.join(ORIG_DIR, slot.id, `original-${n}.jpg`);
        await fs.writeFile(orig, Buffer.from(await res.arrayBuffer()));
        const meta = await sharp(orig).metadata();
        const out = await processPhoto(orig, path.join(PUB_DIR, slot.id, String(n)), fmt);
        manifest.push({
          slot: slot.id,
          used: slot.used,
          format: slot.fmt,
          n,
          source: c.source,
          id: c.id,
          pageUrl: c.pageUrl,
          photographer: c.photographer,
          photographerUrl: c.photographerUrl,
          licence: c.licence,
          originalWidth: meta.width ?? c.width,
          originalHeight: meta.height ?? c.height,
          description: c.description,
          // Plates / third-party logos are NOT auto-detected: review each image on /dev/photos and blur by hand if needed.
          manualCheck: "number plates and third-party logos",
          ...out,
        });
        console.log(`  ${n}. ${c.source} ${c.id} by ${c.photographer} — ${out.webpKb} KB webp / ${out.avifKb} KB avif`);
      } catch (err) {
        console.warn(`  candidate ${c.source}:${c.id} failed: ${err.message}`);
      }
    }
  }

  manifest.sort((a, b) => SLOTS.findIndex((s) => s.id === a.slot) - SLOTS.findIndex((s) => s.id === b.slot) || a.n - b.n);
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${manifest.length} candidates → open http://localhost:3000/dev/photos`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
