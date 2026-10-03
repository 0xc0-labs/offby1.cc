import type { Metadata, Viewport } from "next";
import { en } from "@/content/en";
import { es } from "@/content/es";
import { paths } from "@/content/paths";
import type { Lang, PageKey } from "@/content/types";

export const SITE = "https://offby1.cc";

const CONTENT = { es, en };

export function pageMetadata(lang: Lang, page?: PageKey): Metadata {
  const c = CONTENT[lang];
  const p = paths(page);
  const title = page ? `${c.pages.list[page].title} — offby1` : c.meta.title;
  return {
    metadataBase: new URL(SITE),
    title,
    description: c.meta.description,
    alternates: { canonical: p[lang], languages: { es: p.es, en: p.en, "x-default": p.es } },
    openGraph: {
      type: "website",
      url: p[lang],
      siteName: "offby1",
      title,
      description: c.meta.description,
      locale: lang === "en" ? "en_GB" : "es_ES",
    },
    icons: { icon: "/favicon.svg" },
    // The pages that show the owner's address stay out of search engines.
    ...(page && c.pages.list[page].noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5f1" },
  ],
};
