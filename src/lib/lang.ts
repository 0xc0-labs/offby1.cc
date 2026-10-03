// localStorage, not a cookie: the site sets none, and the server never
// learns the choice.

import type { Lang } from "@/content/types";

export const LANG_KEY = "offby1-lang";

/**
 * Inline in <head>, before the first paint, on / only: English chosen, or no
 * choice and a device language other than Spain's, goes to /en/. Crawlers
 * run no script, so they stay put.
 */
export const LANG_INIT = `try{if(location.pathname==="/"){var s=null;try{s=localStorage.getItem("${LANG_KEY}")}catch(e){}var l=s;if(l!=="es"&&l!=="en"){var d=((navigator.languages&&navigator.languages[0])||navigator.language||"").toLowerCase().split("-")[0];l=d&&["es","ca","gl","eu"].indexOf(d)<0?"en":"es"}if(l==="en")location.replace("/en/"+location.search+location.hash)}}catch(e){}`;

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Storage blocked: the device's language decides next time.
  }
}
