import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import type { Lang } from "@/content/types";
import styles from "./Severity.module.css";

export type Level = "critical" | "high" | "medium" | "low" | "info";

const SEV: Record<Level, { cells: number; es: string; en: string }> = {
  critical: { cells: 4, es: "Crítica", en: "Critical" },
  high: { cells: 3, es: "Alta", en: "High" },
  medium: { cells: 2, es: "Media", en: "Medium" },
  low: { cells: 1, es: "Baja", en: "Low" },
  info: { cells: 0, es: "Info", en: "Info" },
};

export interface SeverityProps {
  level: Level;
  lang?: Lang;
  /** Only the meter; the label stays for screen readers and in `title`. */
  compact?: boolean;
  className?: string;
  children?: ReactNode;
}

/** Never colour alone: the label always goes with the meter. */
export function Severity({ level, lang = "es", compact, className, children }: SeverityProps) {
  const s = SEV[level];
  const label = children ?? s[lang];
  return (
    <span
      className={cx(styles.sev, styles[level], compact && styles.compact, className)}
      title={compact && typeof label === "string" ? label : undefined}
    >
      <span className={styles.meter} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} className={i < s.cells ? styles.on : undefined} />
        ))}
      </span>
      <span className={compact ? "sr-only" : undefined}>{label}</span>
    </span>
  );
}
