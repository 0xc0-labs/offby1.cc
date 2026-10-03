import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./Button.module.css";

interface Common {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  /** Trailing icon; on the primary it is almost always arrow-right. */
  icon?: IconName;
  iconLeft?: IconName;
  className?: string;
  children?: ReactNode;
}
type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common | "href">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common>;
export type ButtonProps = AsLink | AsButton;

/** One primary per view. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", icon, iconLeft, className, children, ...rest } = props;
  const cls = cx(styles.btn, styles[variant], styles[size], className);
  const iconSize = size === "lg" ? 20 : 18;
  const kids = (
    <>
      {iconLeft ? <Icon name={iconLeft} size={iconSize} /> : null}
      <span>{children}</span>
      {icon ? <Icon name={icon} size={iconSize} className={styles.trail} /> : null}
    </>
  );
  if (rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {kids}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {kids}
    </button>
  );
}
