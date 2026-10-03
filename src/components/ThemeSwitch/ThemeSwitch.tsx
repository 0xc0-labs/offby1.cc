"use client";

import { useSyncExternalStore } from "react";
import { cx } from "@/lib/cx";
import { applyTheme, readTheme, THEME_EVENT, type Theme } from "@/lib/theme";
import type { Content } from "@/content/types";
import { Icon, type IconName } from "../Icon/Icon";
import styles from "./ThemeSwitch.module.css";

const OPTIONS: { value: Theme; icon: IconName }[] = [
  { value: "system", icon: "monitor" },
  { value: "light", icon: "sun" },
  { value: "dark", icon: "moon" },
];

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ThemeSwitch({ copy, className }: { copy: Content["nav"]["theme"]; className?: string }) {
  // The server renders "system"; the browser reads what the inline script set.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "system" as Theme);
  return (
    <div className={cx(styles.switch, className)} role="group" aria-label={copy.label}>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className={cx(styles.opt, theme === o.value && styles.active)}
          aria-pressed={theme === o.value}
          aria-label={copy[o.value]}
          title={copy[o.value]}
          onClick={() => applyTheme(o.value)}
        >
          <Icon name={o.icon} size={16} />
        </button>
      ))}
    </div>
  );
}
