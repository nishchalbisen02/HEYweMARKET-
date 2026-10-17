import type { NextConfig } from "next";

// Optimised media in /public keeps stable file names, so it is cached for a week
// (and served stale for a day while revalidating) instead of being revalidated on every visit.
const mediaCache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/work/:file*", headers: mediaCache },
      { source: "/creative/:file*", headers: mediaCache },
      { source: "/clients/:file*", headers: mediaCache },
      { source: "/careers/:file*", headers: mediaCache },
      { source: "/hero/:file*", headers: mediaCache },
      { source: "/showreel.mp4", headers: mediaCache },
      { source: "/showreel-poster.webp", headers: mediaCache },
      { source: "/logo.jpg", headers: mediaCache },
      { source: "/logo-512.png", headers: mediaCache },
    ];
  },
};

export default nextConfig;
