import type { TerminalLine } from "@/components/Terminal/Terminal";
import type { IconName } from "@/components/Icon/Icon";
import type { ContactError } from "@/lib/contact";

export type Lang = "es" | "en";

export type PageKey = "legal" | "privacy" | "cookies" | "disclosure";

interface Section {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
}

interface TextPageContent {
  path: string;
  title: string;
  /** Kept out of search engines and the sitemap: it shows the owner's address. */
  noindex?: boolean;
  sections: Section[];
}

export interface Link {
  label: string;
  href: string;
}

/** Everything a language's landing page says. Each language is written, not translated. */
export interface Content {
  lang: Lang;
  meta: { title: string; description: string };
  nav: { links: Link[]; cta: Link; theme: { label: string; system: string; light: string; dark: string } };
  hero: {
    eyebrow: string;
    title: [string, string];
    lede: string;
    primary: Link;
    secondary: Link;
    note: string;
    terminal: { title: string; status: string; label: string; lines: TerminalLine[] };
  };
  services: {
    /** The section's anchor, in the page's language. */
    id: string;
    eyebrow: string;
    title: string;
    lede: string;
    cards: { icon: IconName; title: string; description: string; items: string[] }[];
  };
  method: {
    /** The section's anchor, in the page's language. */
    id: string;
    eyebrow: string;
    title: string;
    lede: string;
    steps: { title: string; body: string }[];
    report: {
      label: string;
      title: string;
      columns: [string, string, string];
      findings: { level: "critical" | "high" | "medium" | "low"; title: string; status: string; remediated?: boolean }[];
    };
  };
  contact: {
    /** The section's anchor, in the page's language. */
    id: string;
    eyebrow: string;
    title: string;
    lede: string;
    form: {
      name: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      need: string;
      pick: string;
      options: string[];
      message: string;
      messageHint: string;
      optional: string;
      consent: [string, Link, string];
      submit: string;
      sending: string;
      note: string;
      sent: string;
      failed: string;
      errors: Record<ContactError, string>;
    };
  };
  footer: {
    tagline: string;
    columns: { title: string; links: Link[] }[];
    legal: Link[];
  };
  pages: {
    back: Link;
    /** "Last updated", before the date. */
    updated: string;
    list: Record<PageKey, TextPageContent>;
  };
}
