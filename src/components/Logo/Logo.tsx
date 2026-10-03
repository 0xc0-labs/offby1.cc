import { createElement } from "react";
import { cx } from "@/lib/cx";
import { LOGO, type Shape } from "./logo-data";
import styles from "./Logo.module.css";

export interface LogoProps {
  variant?: "lockup" | "mark";
  height?: number;
  /** Accessible name. Empty for a decorative logo next to its own text. */
  title?: string;
  className?: string;
}

function shapes(list: Shape[], className: string, prefix: string) {
  return list.map(([tag, attrs], i) => createElement(tag, { key: prefix + i, className, ...attrs }));
}

export function Logo({ variant = "lockup", height = 28, title = "offby1", className }: LogoProps) {
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  if (variant === "mark") {
    return (
      <svg className={cx(styles.logo, className)} viewBox="0 0 40 40" height={height} width={height} {...a11y}>
        <rect className={styles.ink} x={0} y={0} width={16} height={16} />
        <rect className={styles.ink} x={20} y={0} width={16} height={16} />
        <rect className={styles.ink} x={0} y={20} width={16} height={16} />
        <rect className={styles.signal} x={24} y={24} width={16} height={16} />
      </svg>
    );
  }
  const width = Math.round(((height * LOGO.width) / LOGO.height) * 100) / 100;
  return (
    <svg className={cx(styles.logo, className)} viewBox={LOGO.viewBox} height={height} width={width} {...a11y}>
      {shapes(LOGO.ink, styles.ink, "i")}
      {shapes(LOGO.signal, styles.signal, "s")}
    </svg>
  );
}
