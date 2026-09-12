import type { NextConfig } from "next";

// Avatars load straight from the backend (D2 — see CLAUDE.md §3's Phase 4
// note), not through the frontend's own /api/* proxy, so next/image needs
// this host allow-listed. Falls back to the native/Docker dev default if
// the env var isn't set yet.
const assetBaseUrl = new URL(
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "http://localhost:3001",
);

const nextConfig: NextConfig = {
  // Standalone output is what the prod Dockerfile stage copies into the
  // runtime image — it traces only the deps each page actually needs
  // instead of shipping the full node_modules tree.
  output: "standalone",
  // Output-file tracing under-collects @swc/helpers (copies cjs/ but not
  // esm/, which next's own require-hook needs at runtime) — known upstream
  // gap, force the whole package in rather than relying on tracing for it.
  outputFileTracingIncludes: {
    "/**": ["./node_modules/@swc/helpers/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: assetBaseUrl.protocol.replace(":", "") as "http" | "https",
        hostname: assetBaseUrl.hostname,
        port: assetBaseUrl.port,
        pathname: "/api/v1/assets/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // The 2 MB avatar cap (D2) plus multipart boundary/header overhead.
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
