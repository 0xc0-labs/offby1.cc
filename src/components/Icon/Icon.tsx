import { createElement } from "react";
import { cx } from "@/lib/cx";
import { EXTRA_ICONS } from "./extra-icons";
import { ICONS } from "./icons";
import styles from "./Icon.module.css";

const ALL = { ...ICONS, ...EXTRA_ICONS };

export type IconName = keyof typeof ALL;

export interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  /** Accessible name; without it the icon is decorative. */
  label?: string;
  className?: string;
}

export function Icon({ name, size = 20, strokeWidth = 1.5, label, className }: IconProps) {
  const nodes = ALL[name];
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: false };
  return (
    <svg
      className={cx(styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {nodes.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
