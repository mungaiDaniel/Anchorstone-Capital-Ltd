import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Site-wide social share card. ImageResponse can't read CSS variables, so the
// hex values below mirror the brand tokens in globals.css (brand-950/700, accent-gold, brand-200).
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #000833 0%, #00178a 100%)",
          color: "#ffffff",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontSize: 44, fontWeight: 700 }}>Anchorstone</span>
          <span style={{ fontSize: 22, letterSpacing: 6, color: "#c3c7f2" }}>CAPITAL LTD</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ width: 80, height: 4, background: "#ffcd57" }} />
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
