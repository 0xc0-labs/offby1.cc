import type { NextConfig } from "next";

// No headers here: the CSP needs a per-request nonce (src/proxy.ts), and the
// rest are Traefik's, in gitops (README.md, Security headers).
const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: true,
  // Every image is an inline SVG: no optimizer, no sharp at runtime.
  images: { unoptimized: true },
};

export default nextConfig;
