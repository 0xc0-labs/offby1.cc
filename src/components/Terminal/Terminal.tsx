import { cx } from "@/lib/cx";
import type { Lang } from "@/content/types";
import { Logo } from "../Logo/Logo";
import { Severity, type Level } from "../Severity/Severity";
import styles from "./Terminal.module.css";

export interface TerminalLine {
  kind?: "cmd" | "out" | "finding" | "ok";
  text: string;
  level?: Level;
}

export interface TerminalProps {
  /** At most 8 lines; generic paths and findings, never a client's. */
  lines: TerminalLine[];
  title?: string;
  status?: string;
  lang?: Lang;
  cursor?: boolean;
  label?: string;
  className?: string;
}

export function Terminal({ lines, title = "audit.log", status, lang = "es", cursor = true, label, className }: TerminalProps) {
  return (
    <figure className={cx(styles.term, className)} aria-label={label ?? title}>
      <figcaption className={cx(styles.bar, "label")}>
        <span className={styles.title}>
          <Logo variant="mark" height={12} title="" className={styles.mark} />
          {title}
        </span>
        {status ? (
          <span className={styles.status}>
            <i aria-hidden="true" />
            {status}
          </span>
        ) : null}
      </figcaption>
      <ol className={cx(styles.body, "code")} start={0}>
        {lines.map((line, i) => {
          const kind = line.kind ?? "out";
          return (
            <li key={i} className={cx(styles.line, styles[kind])}>
              <span className={styles.no} aria-hidden="true">
                {String(i).padStart(2, "0")}
              </span>
              <span className={styles.text}>
                {kind === "cmd" ? <span className={styles.prompt}>$ </span> : null}
                {kind === "finding" && line.level ? <Severity level={line.level} lang={lang} compact /> : null}
                {kind === "ok" ? <span className={styles.ok}>ok </span> : null}
                {line.text}
                {cursor && i === lines.length - 1 ? <span className={styles.cursor} aria-hidden="true" /> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
