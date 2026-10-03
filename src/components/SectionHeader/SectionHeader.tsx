import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./SectionHeader.module.css";

export interface SectionHeaderProps {
  /** Two digits; indexes start at "00". */
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  id?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ index, eyebrow, title, lede, as: Tag = "h2", align = "left", id, className, children }: SectionHeaderProps) {
  return (
    <header className={cx(styles.header, align === "center" && styles.center, className)}>
      {index != null || eyebrow ? (
        <p className={cx(styles.eyebrow, "label")}>
          {index != null ? <span className={styles.index}>[{index}]</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      ) : null}
      <Tag id={id} className={cx(styles.title, "display")}>
        {title}
      </Tag>
      {lede ? <p className={cx(styles.lede, "body-lg")}>{lede}</p> : null}
      {children}
    </header>
  );
}
