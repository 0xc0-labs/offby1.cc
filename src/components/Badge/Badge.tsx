import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Badge.module.css";

export interface BadgeProps {
  tone?: "neutral" | "signal" | "outline";
  icon?: IconName;
  className?: string;
  children?: ReactNode;
}

export function Badge({ tone = "neutral", icon, className, children }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], className)}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
    </span>
  );
}
