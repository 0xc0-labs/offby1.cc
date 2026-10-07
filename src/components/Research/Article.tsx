import Link from "next/link";
import { AUTHOR, researchIndex, researchPaths, type Article as ArticleModel } from "@/content/research";
import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { Shell } from "../Page/Shell";
import styles from "./Research.module.css";

/** One research article. */
export function Article({ content: c, article }: { content: Content; article: ArticleModel }) {
  const t = researchIndex[c.lang];
  const a = article[c.lang];
  return (
    <Shell content={c} langHrefs={researchPaths(article)}>
      <article className={styles.article}>
        <p className={cx(styles.meta, "label")}>
          <time dateTime={article.date}>{article.date}</time>
          <span aria-hidden="true">·</span>
          <span>
            {t.by} {AUTHOR}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {article.readingMinutes} {t.minutes}
          </span>
        </p>
        <SectionHeader as="h1" title={a.title} lede={a.lede} />
        <div className={styles.body}>
          {a.sections.map((section, i) => (
            <section key={section.heading ?? i} className={styles.section}>
              {section.heading ? <h2 className={cx(styles.heading, "heading")}>{section.heading}</h2> : null}
              {section.paragraphs?.map((para) => (
                <p key={para} className={cx(styles.para, "body")}>
                  {para}
                </p>
              ))}
              {section.items ? (
                <ul className={cx(styles.points, "body")}>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.code ? (
                <figure className={styles.code}>
                  <pre className="code">
                    <code>{section.code.body}</code>
                  </pre>
                  {section.code.caption ? <figcaption className={cx(styles.codeCaption, "small")}>{section.code.caption}</figcaption> : null}
                </figure>
              ) : null}
            </section>
          ))}
        </div>
        <p className={cx(styles.disclaimer, "small")}>{t.disclaimer}</p>
        <Link href={researchPaths()[c.lang]} className={styles.back}>
          <Icon name="arrow-right" size={16} className={styles.backIcon} />
          {t.backToList}
        </Link>
      </article>
    </Shell>
  );
}
