import Link from "next/link";
import { cx } from "@/lib/cx";
import type { Link as LinkItem } from "@/content/types";
import { Logo } from "../Logo/Logo";
import styles from "./Footer.module.css";

export interface FooterProps {
  tagline?: string;
  /** Up to 3; always one for Security (security.txt, responsible disclosure). */
  columns: { title: string; links: LinkItem[] }[];
  legal: LinkItem[];
  year: number;
  className?: string;
}

export function Footer({ tagline, columns, legal, year, className }: FooterProps) {
  return (
    <footer className={cx(styles.foot, className)}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo height={24} />
          {tagline ? <p className={cx(styles.tag, "small")}>{tagline}</p> : null}
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <p className={cx(styles.heading, "label")}>{c.title}</p>
            <ul className={styles.list}>
              {c.links.map((l) => (
                <li key={l.label}>
                  {/* A static file (security.txt) is a plain link; pages are client-side. */}
                  {l.href.startsWith("/.well-known/") ? (
                    <a href={l.href} className={cx(styles.link, "small")}>
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className={cx(styles.link, "small")}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <p className="small">© {year} offby1 · offby1.cc</p>
        <ul className={styles.legal}>
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={cx(styles.legalLink, "small")}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
