import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

// Site-wide social share card (1200×630). ImageResponse can't read CSS variables,
// so the hex values mirror the brand tokens in globals.css (navy, brand blue, soft).
export const alt = `${siteConfig.name} — Credit that moves you forward`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/logo_full_white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "linear-gradient(135deg, #0b1050 0%, #0b1050 55%, #1c24a0 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#aeb4f0", textTransform: "uppercase" }}>
            Licensed by the Central Bank of Kenya
          </div>
          <div style={{ marginTop: 28, fontSize: 84, lineHeight: 1.05, fontWeight: 600 }}>Credit that moves you forward.</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={340} height={219} />
      </div>
    ),
    size,
  );
}
