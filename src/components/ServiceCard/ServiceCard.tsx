import { cx } from "@/lib/cx";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./ServiceCard.module.css";

export interface ServiceCardProps {
  icon?: IconName;
  index?: string;
  title: string;
  description?: string;
  /** Up to 4 scope items, no full stop. */
  items?: string[];
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function ServiceCard({ icon, index, title, description, items, href, linkLabel, className }: ServiceCardProps) {
  const body = (
    <>
      <div className={styles.top}>
        {icon ? (
          <span className={styles.icon}>
            <Icon name={icon} size={28} />
          </span>
        ) : (
          <span />
        )}
        {index != null ? <span className={cx(styles.index, "label")}>{index}</span> : null}
      </div>
      <h3 className={cx(styles.title, "title")}>{title}</h3>
      {description ? <p className={cx(styles.desc, "body")}>{description}</p> : null}
      {items?.length ? (
        <ul className={cx(styles.list, "small")}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {linkLabel ? (
        <span className={styles.more}>
          {linkLabel}
          <Icon name="arrow-right" size={16} className={styles.moreIcon} />
        </span>
      ) : null}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cx(styles.card, styles.link, className)}>
        {body}
      </a>
    );
  }
  return <article className={cx(styles.card, className)}>{body}</article>;
}
