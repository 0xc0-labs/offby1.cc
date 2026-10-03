import { LEGAL_UPDATED } from "@/content/owner";
import type { Content, PageKey } from "@/content/types";
import { cx } from "@/lib/cx";
import { Button } from "../Button/Button";
import { RichText } from "../Email/RichText";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { Shell } from "./Shell";
import styles from "./TextPage.module.css";

export function TextPage({ content: c, page }: { content: Content; page: PageKey }) {
  const p = c.pages.list[page];
  return (
    <Shell content={c} page={page}>
      <article className={styles.page}>
        <SectionHeader as="h1" title={p.title} />
        <p className={cx(styles.updated, "label")}>
          {c.pages.updated} <time dateTime={LEGAL_UPDATED}>{LEGAL_UPDATED}</time>
        </p>
        <div className={styles.body}>
          {p.sections.map((section, i) => (
            <section key={section.heading ?? i} className={styles.section}>
              {section.heading ? <h2 className={cx(styles.heading, "title")}>{section.heading}</h2> : null}
              {section.items ? (
                <ul className={cx(styles.list, "body")}>
                  {section.items.map((item) => (
                    <li key={item}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.paragraphs?.map((para) => (
                <p key={para} className={cx(styles.para, "body")}>
                  <RichText text={para} />
                </p>
              ))}
            </section>
          ))}
        </div>
        <Button href={c.pages.back.href} variant="secondary" className={styles.back}>
          {c.pages.back.label}
        </Button>
      </article>
    </Shell>
  );
}
