import type { Metadata } from "next";
import { AUTHOR, articleBySlug, researchIndex, researchPaths, type Article } from "@/content/research";
import type { Lang } from "@/content/types";
import { SITE } from "./metadata";

const other = (lang: Lang): Lang => (lang === "en" ? "es" : "en");

export function researchIndexMetadata(lang: Lang): Metadata {
  const t = researchIndex[lang];
  const p = researchPaths();
  return {
    metadataBase: new URL(SITE),
    title: `${t.title} — offby1`,
    description: t.lede,
    alternates: { canonical: p[lang], languages: { es: p.es, en: p.en, "x-default": p.es } },
    openGraph: { type: "website", url: p[lang], siteName: "offby1", title: t.title, description: t.lede, locale: lang === "en" ? "en_GB" : "es_ES" },
    icons: { icon: "/favicon.svg" },
  };
}

export function articleMetadata(lang: Lang, article: Article): Metadata {
  const a = article[lang];
  const p = researchPaths(article);
  return {
    metadataBase: new URL(SITE),
    title: `${a.title} — offby1`,
    description: a.lede,
    authors: [{ name: AUTHOR }],
    alternates: { canonical: p[lang], languages: { es: p.es, en: p.en, "x-default": p.es } },
    openGraph: {
      type: "article",
      url: p[lang],
      siteName: "offby1",
      title: a.title,
      description: a.lede,
      locale: lang === "en" ? "en_GB" : "es_ES",
      publishedTime: article.date,
      authors: [AUTHOR],
    },
    icons: { icon: "/favicon.svg" },
  };
}

/** The article for a route's slug, or undefined to 404. */
export { articleBySlug, other };
