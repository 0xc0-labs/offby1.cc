import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import { Icon } from "../Icon/Icon";
import styles from "./Input.module.css";

interface Field {
  label?: string;
  hint?: string;
  error?: string;
  /** Shown after the label, e.g. "(opcional)". */
  optional?: string;
  className?: string;
}
type AsInput = Field & { as?: "input" } & Omit<InputHTMLAttributes<HTMLInputElement>, keyof Field>;
type AsTextarea = Field & { as: "textarea" } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof Field>;
type AsSelect = Field & {
  as: "select";
  options: (string | { value: string; label: string })[];
  placeholderOption?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, keyof Field>;
export type InputProps = AsInput | AsTextarea | AsSelect;

export function Input({ label, hint, error, optional, className, ...props }: InputProps) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const described = [hint && !error ? `${id}-hint` : null, error ? `${id}-err` : null].filter(Boolean).join(" ") || undefined;
  const aria = { id, "aria-invalid": error ? true : undefined, "aria-describedby": described };

  let control;
  if (props.as === "select") {
    const { as: _as, options, placeholderOption, ...rest } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
    control = (
      <div className={styles.selectWrap}>
        <select {...rest} {...aria} className={cx(styles.control, styles.select)}>
          {placeholderOption ? <option value="">{placeholderOption}</option> : null}
          {options.map((o) => {
            const v = typeof o === "string" ? o : o.value;
            return (
              <option key={v} value={v}>
                {typeof o === "string" ? o : o.label}
              </option>
            );
          })}
        </select>
        <svg className={styles.caret} viewBox="0 0 12 12" width={12} height={12} aria-hidden="true">
          <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      </div>
    );
  } else if (props.as === "textarea") {
    const { as: _as, rows = 5, ...rest } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
    control = <textarea rows={rows} {...rest} {...aria} className={cx(styles.control, styles.textarea)} />;
  } else {
    const { as: _as, type = "text", ...rest } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
    control = <input type={type} {...rest} {...aria} className={cx(styles.control, styles.input)} />;
  }

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      {label ? (
        <label htmlFor={id} className={styles.label}>
          {label}
          {optional ? <span className={styles.optional}> {optional}</span> : null}
        </label>
      ) : null}
      {control}
      {hint && !error ? (
        <p id={`${id}-hint`} className={cx(styles.hint, "small")}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} className={cx(styles.error, "small")}>
          <Icon name="triangle-alert" size={16} className={styles.errorIcon} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
