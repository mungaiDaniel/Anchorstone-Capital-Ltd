/**
 * Import hand-downloaded photos (e.g. from Nappy, Burst, Unsplash/Pexels websites) for the review page.
 *
 *   node scripts/import-photos.mjs            # all slots that have files
 *   node scripts/import-photos.mjs logbook    # only these slots
 *
 * Drop images into photo-imports/<slot>/ (jpg, png or webp, ideally 2400px+ on the long edge).
 * Optional photo-imports/<slot>/credits.json maps a file name to its credit, e.g.
 *   { "my-photo.jpg": { "photographer": "Jane Doe", "photographerUrl": "https://nappy.co/...", "pageUrl": "https://nappy.co/photo/...", "source": "Nappy", "licence": "Nappy License" } }
 * Files without an entry are listed as source "Nappy" with an unknown photographer — fill them in before launch.
 *
 * Output matches fetch-photos.mjs: public/photo-candidates/<slot>/N.webp|avif + candidates.json for /dev/photos.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const FORMATS = {
  hero: { w: 2400, h: 1350, cap: 350 },
  card: { w: 1200, h: 900, cap: 200 },
  tall: { w: 1000, h: 1250, cap: 200 },
};

const SLOTS = [
  { id: "home-hero", fmt: "hero", used: "Home hero" },
  { id: "logbook", fmt: "card", used: "Logbook Loan" },
  { id: "personal-secured", fmt: "card", used: "Personal Secured Loan" },
  { id: "study-abroad", fmt: "card", used: "Study Abroad Loan" },
  { id: "sme", fmt: "card", used: "SME Loan" },
  { id: "insurance", fmt: "card", used: "Insurance" },
  { id: "about-story", fmt: "card", used: "About Us — Our Story" },
  { id: "about-values", fmt: "card", used: "Core Values / Vision" },
  { id: "how-it-works", fmt: "card", used: "How it works / Apply" },
  { id: "careers-hero", fmt: "hero", used: "Careers hero" },
  { id: "careers-culture-1", fmt: "tall", used: "Careers culture 1 (focused work)" },
  { id: "careers-culture-2", fmt: "tall", used: "Careers culture 2 (teamwork)" },
  { id: "careers-culture-3", fmt: "tall", used: "Careers culture 3 (helping a customer)" },
  { id: "partners", fmt: "hero", used: "Partners" },
  { id: "media", fmt: "hero", used: "Media Centre" },
  { id: "contact", fmt: "hero", used: "Contact" },
  { id: "cta-band", fmt: "hero", used: "Closing CTA band" },
];

const IN_DIR = "photo-imports";
const PUB_DIR = "public/photo-candidates";
const only = process.argv.slice(2);
const slots = only.length ? SLOTS.filter((s) => only.includes(s.id)) : SLOTS;

async function encode(pipeline, format, startQuality, capKb) {
  let q = startQuality;
  for (;;) {
    const buf = await pipeline.clone()[format](format === "webp" ? { quality: q } : { quality: q, effort: 4 }).toBuffer();
    if (buf.length <= capKb * 1024 || q <= 40) return buf;
    q -= 4;
  }
}

async function main() {
  await fs.mkdir(PUB_DIR, { recursive: true });
  const manifestPath = path.join(PUB_DIR, "candidates.json");
  let manifest = [];
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch {}

  let imported = 0;
  for (const slot of slots) {
    const dir = path.join(IN_DIR, slot.id);
    let files = [];
    try {
      files = (await fs.readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
    } catch {
      continue;
    }
    if (!files.length) continue;

    let credits = {};
    try {
      credits = JSON.parse(await fs.readFile(path.join(dir, "credits.json"), "utf8"));
    } catch {}

    const fmt = FORMATS[slot.fmt];
    console.log(`\n▸ ${slot.id} (${slot.fmt} ${fmt.w}×${fmt.h})`);
    manifest = manifest.filter((c) => c.slot !== slot.id);
    await fs.mkdir(path.join(PUB_DIR, slot.id), { recursive: true });

    let n = 0;
    for (const file of files) {
      n += 1;
      const src = path.join(dir, file);
      const meta = await sharp(src).metadata();
      const base = sharp(src).rotate().resize(fmt.w, fmt.h, { fit: "cover", position: sharp.strategy.attention });
      const webp = await encode(base, "webp", 78, fmt.cap);
      const avif = await encode(base, "avif", 55, fmt.cap);
      const out = path.join(PUB_DIR, slot.id, String(n));
      await fs.writeFile(`${out}.webp`, webp);
      await fs.writeFile(`${out}.avif`, avif);
      const blur = await sharp(src).rotate().resize(16, Math.round((16 * fmt.h) / fmt.w), { fit: "cover" }).webp({ quality: 40 }).toBuffer();
      const c = credits[file] ?? {};
      manifest.push({
        slot: slot.id,
        used: slot.used,
        format: slot.fmt,
        n,
        source: c.source ?? "Nappy",
        id: file,
        pageUrl: c.pageUrl ?? "https://nappy.co",
        photographer: c.photographer ?? "Unknown (add credit)",
        photographerUrl: c.photographerUrl ?? "https://nappy.co",
        licence: c.licence ?? "Nappy License (free commercial use)",
        originalWidth: meta.width ?? 0,
        originalHeight: meta.height ?? 0,
        description: c.description ?? file,
        manualCheck: "number plates and third-party logos",
        webpKb: Math.round(webp.length / 1024),
        avifKb: Math.round(avif.length / 1024),
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
        width: fmt.w,
        height: fmt.h,
      });
      imported += 1;
      const small = Math.max(meta.width ?? 0, meta.height ?? 0) < 1600 ? "  ⚠ low resolution" : "";
      console.log(`  ${n}. ${file} — ${meta.width}×${meta.height}, ${Math.round(webp.length / 1024)} KB webp${small}`);
    }
  }

  manifest.sort((a, b) => SLOTS.findIndex((s) => s.id === a.slot) - SLOTS.findIndex((s) => s.id === b.slot) || a.n - b.n);
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(imported ? `\nDone. ${imported} photo(s) imported → open http://localhost:3000/dev/photos` : `\nNo images found. Put files in ${IN_DIR}/<slot>/ (see the header of this script).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
