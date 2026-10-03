export type Theme = "system" | "light" | "dark";

export const THEME_KEY = "offby1-theme";
export const THEME_EVENT = "offby1-theme";

/** Inline in <head>, before the first paint, so a stored choice never flashes the other theme. */
export const THEME_INIT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function readTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : "system";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
  try {
    if (theme === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

/** React drops data-theme if a failed hydration rebuilds the page; ThemeSync calls this on mount. */
export function restoreTheme() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch {
    return;
  }
  if ((stored === "light" || stored === "dark") && document.documentElement.dataset.theme !== stored) {
    document.documentElement.dataset.theme = stored;
    window.dispatchEvent(new Event(THEME_EVENT));
  }
}
