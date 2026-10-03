import localFont from "next/font/local";

export const sans = localFont({
  src: "../fonts/InstrumentSans-Variable-latin.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const mono = localFont({
  src: "../fonts/JetBrainsMono-Variable-latin.woff2",
  weight: "100 800",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
});
