import type { MetadataRoute } from "next";
import { es } from "@/content/es";
import { paths } from "@/content/paths";
import { articles, researchPaths } from "@/content/research";
import type { PageKey } from "@/content/types";
import { SITE } from "./metadata";

// The noindex pages (the owner's address) are left out.
const TEXT_PAGES: PageKey[] = ["disclosure", "legal", "privacy", "cookies"];
const PAGES: (PageKey | undefined)[] = [undefined, ...TEXT_PAGES.filter((page) => !es.pages.list[page].noindex)];

const pair = (p: { es: string; en: string }): MetadataRoute.Sitemap => {
  const languages = { es: SITE + p.es, en: SITE + p.en };
  return [
    { url: SITE + p.es, alternates: { languages } },
    { url: SITE + p.en, alternates: { languages } },
  ];
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.flatMap((page) => pair(paths(page))),
    ...pair(researchPaths()),
    ...articles.flatMap((a) => pair(researchPaths(a))),
  ];
}
