import type { ReactNode } from "react";
import { paths } from "@/content/paths";
import type { Content, PageKey } from "@/content/types";
import { Footer } from "../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";

/** Without `page`, the landing. */
export function Shell({ content: c, page, children }: { content: Content; page?: PageKey; children: ReactNode }) {
  const home = !page;
  const homeHref = c.lang === "en" ? "/en/" : "/";
  // Away from the landing, the section links point back at it.
  const links = c.nav.links.map((l) => (home ? l : { ...l, href: homeHref + l.href }));
  const cta = home ? c.nav.cta : { ...c.nav.cta, href: homeHref + c.nav.cta.href };
  const footerColumns = c.footer.columns.map((col) => ({
    ...col,
    links: col.links.map((l) => (home || !l.href.startsWith("#") ? l : { ...l, href: homeHref + l.href })),
  }));
  return (
    <>
      <a href="#main" className="skip-link">
        {c.lang === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>
      <NavBar links={links} cta={cta} theme={c.nav.theme} lang={c.lang} langHrefs={paths(page)} homeHref={homeHref} sticky />
      <main id="main">{children}</main>
      <Footer tagline={c.footer.tagline} columns={footerColumns} legal={c.footer.legal} year={new Date().getFullYear()} />
    </>
  );
}
