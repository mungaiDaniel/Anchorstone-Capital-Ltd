import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // CV uploads on /careers are posted through a Server Action (max file 5 MB + form overhead).
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep old WordPress profile URLs (and their search ranking) working.
  async redirects() {
    return [
      { source: "/our-team", destination: "/about-us/team", permanent: true },
      ...["/selestine-mwanga-2", "/f-a-lemek", "/gilbert-leklabu-2"].map((source) => ({
        source,
        destination: "/about-us/team",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
