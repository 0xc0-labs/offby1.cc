import { NextResponse, type NextRequest } from "next/server";

// 'self' admits Cloudflare's /cdn-cgi/ scripts, such as Email Obfuscation's
// decoder (operator decision, 2026-10-03). No 'strict-dynamic': browsers
// would then ignore 'self' and block them.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const dev = process.env.NODE_ENV === "development";
  const path = request.nextUrl.pathname;
  // The lab's first page keeps the 'strict-dynamic' it demonstrates
  // (src/lib/lab.ts).
  const strictDynamic = path.startsWith("/lab/email-obfuscation/strict/") ? " 'strict-dynamic'" : "";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${strictDynamic}${dev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  // The page's language, for the root layout's <html lang>. The lab is in English.
  headers.set("x-lang", path === "/en" || path.startsWith("/en/") || path.startsWith("/lab/") ? "en" : "es");
  headers.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|healthz|_next/static|_next/image|favicon.svg|\\.well-known).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
