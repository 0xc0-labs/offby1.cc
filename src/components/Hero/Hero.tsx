import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Button } from "../Button/Button";
import styles from "./Hero.module.css";

interface Action {
  label: string;
  href: string;
}

export interface HeroProps {
  eyebrow?: string;
  /** One sentence with a full stop; wrap the key phrase in <em>. */
  title: ReactNode;
  lede?: ReactNode;
  primary?: Action;
  secondary?: Action;
  note?: ReactNode;
  /** Usually a Terminal. */
  aside?: ReactNode;
  id?: string;
  className?: string;
}

export function Hero({ eyebrow, title, lede, primary, secondary, note, aside, id = "hero-title", className }: HeroProps) {
  return (
    <section className={cx(styles.hero, !aside && styles.solo, className)} aria-labelledby={id}>
      <div className={styles.grid} aria-hidden="true">
        <i className={styles.off} />
      </div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          {eyebrow ? <p className={cx(styles.eyebrow, "label")}>{eyebrow}</p> : null}
          <h1 id={id} className={cx(styles.title, "display-xl")}>
            {title}
          </h1>
          {lede ? <p className={cx(styles.lede, "body-lg")}>{lede}</p> : null}
          {primary || secondary ? (
            <div className={styles.actions}>
              {primary ? (
                <Button href={primary.href} size="lg" icon="arrow-right">
                  {primary.label}
                </Button>
              ) : null}
              {secondary ? (
                <Button href={secondary.href} size="lg" variant="secondary">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          ) : null}
          {note ? <p className={cx(styles.note, "small")}>{note}</p> : null}
        </div>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
      </div>
    </section>
  );
}
