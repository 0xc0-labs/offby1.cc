"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";
import type { Content, Lang } from "@/content/types";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { LangSwitch } from "../LangSwitch/LangSwitch";
import { Logo } from "../Logo/Logo";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import styles from "./NavBar.module.css";

export interface LinkItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavBarProps {
  /** At most 5. */
  links: LinkItem[];
  cta?: { label: string; href: string };
  theme: Content["nav"]["theme"];
  lang: Lang;
  langHrefs: Record<Lang, string>;
  sticky?: boolean;
  homeHref?: string;
  className?: string;
}

export function NavBar({ links, cta, theme, lang, langHrefs, sticky, homeHref = "/", className }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const en = lang === "en";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cx(styles.nav, sticky && styles.sticky, open && styles.open, className)}>
      <div className={styles.inner}>
        <a className={styles.brand} href={homeHref} aria-label={en ? "offby1 — home" : "offby1 — inicio"}>
          <Logo height={24} title="" />
        </a>
        <nav className={styles.links} aria-label={en ? "Main" : "Principal"}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={cx(styles.link, l.active && styles.active)} aria-current={l.active ? "page" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className={styles.end}>
          <ThemeSwitch copy={theme} className={styles.themeBar} />
          <LangSwitch value={lang} hrefs={langHrefs} label={en ? "Language" : "Idioma"} />
          {cta ? (
            <Button href={cta.href} size="md" className={styles.cta}>
              {cta.label}
            </Button>
          ) : null}
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? (en ? "Close menu" : "Cerrar menú") : en ? "Open menu" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>
      {open ? (
        <div id="nav-panel" className={styles.panel}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.plink} onClick={() => setOpen(false)}>
              {l.label}
              <Icon name="arrow-right" size={18} />
            </a>
          ))}
          <div className={styles.themeRow}>
            <span className="label">{theme.label}</span>
            <ThemeSwitch copy={theme} />
          </div>
          {cta ? (
            <Button href={cta.href} size="lg" icon="arrow-right" onClick={() => setOpen(false)}>
              {cta.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
