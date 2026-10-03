import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  error?: string;
}

/** Never pre-checked: it collects consent. */
export function Checkbox({ label, error, className, id: givenId, ...rest }: CheckboxProps) {
  const autoId = useId();
  const id = givenId ?? autoId;
  return (
    <div className={cx(styles.check, error && styles.invalid, className)}>
      <input
        {...rest}
        id={id}
        type="checkbox"
        className={styles.box}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      <label htmlFor={id} className={cx(styles.label, "small")}>
        {label}
      </label>
      {error ? (
        <p id={`${id}-err`} className={cx(styles.error, "small")}>
          <Icon name="triangle-alert" size={16} className={styles.errorIcon} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
