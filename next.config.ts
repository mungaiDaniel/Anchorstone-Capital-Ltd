import type { NextConfig } from "next";
import { team } from "./src/content/team";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // All imagery is self-hosted in /public/images (no remote hosts).
    formats: ["image/avif", "image/webp"],
    // One high quality level for all photography (HD masters live in /public/images).
    qualities: [85],
  },
  // Keep old WordPress profile URLs working (and their search ranking).
  async redirects() {
    return team.map((m) => ({
      source: m.legacyPath,
      destination: `/our-team/${m.slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
