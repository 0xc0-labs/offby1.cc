import Link from "next/link";
import { AUTHOR, articles, researchIndex, researchPaths } from "@/content/research";
import type { Content } from "@/content/types";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { Shell } from "../Page/Shell";
import styles from "./Research.module.css";

/** The research index: the list of articles, newest first. */
export function ResearchIndex({ content: c }: { content: Content }) {
  const t = researchIndex[c.lang];
  const ordered = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Shell content={c} langHrefs={researchPaths()}>
      <article className={styles.page}>
        <SectionHeader as="h1" index="00" eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        <ul className={styles.list}>
          {ordered.map((a) => {
            const l = a[c.lang];
            return (
              <li key={a.id} className={styles.item}>
                <Link href={researchPaths(a)[c.lang]} className={styles.itemLink}>
                  <p className={cx(styles.itemMeta, "label")}>
                    <time dateTime={a.date}>{a.date}</time>
                    <span aria-hidden="true">·</span>
                    <span>
                      {a.readingMinutes} {t.minutes}
                    </span>
                  </p>
                  <h2 className={cx(styles.itemTitle, "heading")}>{l.title}</h2>
                  <p className={cx(styles.itemLede, "body")}>{l.lede}</p>
                  <span className={styles.more}>
                    {t.readMore}
                    <Icon name="arrow-right" size={16} className={styles.moreIcon} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className={cx(styles.disclaimer, "small")}>
          {t.by} {AUTHOR} · offby1. {t.disclaimer}
        </p>
      </article>
    </Shell>
  );
}
