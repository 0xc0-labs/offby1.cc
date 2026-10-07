import type { ReactNode } from "react";
import { paths } from "@/content/paths";
import type { Content, Lang, PageKey } from "@/content/types";
import { Footer } from "../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";

/** Without `page` or `langHrefs`, the landing. `langHrefs` is for pages
 * outside the PageKey set (research), which pass their own counterpart paths. */
export function Shell({ content: c, page, langHrefs, children }: { content: Content; page?: PageKey; langHrefs?: Record<Lang, string>; children: ReactNode }) {
  const home = !page && !langHrefs;
  const homeHref = c.lang === "en" ? "/en/" : "/";
  // Away from the landing, the section links point back at it.
  const prefix = (l: { label: string; href: string }) => (home || !l.href.startsWith("#") ? l : { ...l, href: homeHref + l.href });
  const links = c.nav.links.map(prefix);
  const cta = prefix(c.nav.cta);
  const footerColumns = c.footer.columns.map((col) => ({
    ...col,
    links: col.links.map((l) => (home || !l.href.startsWith("#") ? l : { ...l, href: homeHref + l.href })),
  }));
  return (
    <>
      <a href="#main" className="skip-link">
        {c.lang === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>
      <NavBar links={links} cta={cta} theme={c.nav.theme} lang={c.lang} langHrefs={langHrefs ?? paths(page)} homeHref={homeHref} sticky />
      <main id="main">{children}</main>
      <Footer tagline={c.footer.tagline} columns={footerColumns} legal={c.footer.legal} year={new Date().getFullYear()} />
    </>
  );
}
