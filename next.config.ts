import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep old WordPress profile URLs (and their search ranking) working.
  async redirects() {
    return ["/selestine-mwanga-2", "/f-a-lemek", "/gilbert-leklabu-2"].map((source) => ({
      source,
      destination: "/our-team",
      permanent: true,
    }));
  },
};

export default nextConfig;
