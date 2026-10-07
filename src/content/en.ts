import { OWNER } from "./owner";
import type { Content } from "./types";

// Sample copy from the design system: provisional until the real offering
// (services, standards, response times) replaces it. README.md, Content.
export const en: Content = {
  lang: "en",
  meta: {
    title: "offby1 — Cybersecurity audits and consulting",
    description:
      "Security audits, penetration testing and consulting for teams that can't afford to be off by one.",
  },
  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Method", href: "#method" },
      { label: "Contact", href: "#contact" },
      { label: "Research", href: "/en/research/" },
    ],
    cta: { label: "Request an audit", href: "#contact" },
    theme: { label: "Theme", system: "Match the system", light: "Light", dark: "Dark" },
  },
  hero: {
    eyebrow: "Cybersecurity audits and consulting",
    title: ["We find the flaw ", "before they do."],
    lede: "Security audits, penetration testing and consulting for teams that can't afford to be off by one.",
    primary: { label: "Request an audit", href: "#contact" },
    secondary: { label: "See services", href: "#services" },
    note: "Fixed scope and NDA before we start.",
    terminal: {
      title: "audit.log",
      status: "Running",
      label: "Sample log of an audit",
      lines: [
        { kind: "cmd", text: "offby1 audit --scope app.client.com" },
        { kind: "out", text: "214 endpoints · 3 roles · 2 environments" },
        { kind: "finding", level: "critical", text: "SQL injection in /search?q=" },
        { kind: "finding", level: "high", text: "IDOR in /api/v2/invoices/{id}" },
        { kind: "finding", level: "medium", text: "Missing CSP on /dashboard" },
        { kind: "finding", level: "low", text: "Server version disclosed" },
        { kind: "ok", text: "prioritised report · 4 findings" },
      ],
    },
  },
  services: {
    id: "services",
    eyebrow: "Services",
    title: "What we do",
    lede: "Three ways to work with us, one outcome: you know what's wrong, how much it matters and how to fix it.",
    cards: [
      {
        icon: "shield-check",
        title: "Security audit",
        description: "We review infrastructure, code and configuration, and hand you a report prioritised by risk.",
        items: ["Architecture review", "Server and cloud hardening", "Source code analysis"],
      },
      {
        icon: "scan-search",
        title: "Penetration testing",
        description: "We attack your application the way an outsider would, inside a fixed scope agreed in writing.",
        items: ["Web applications and APIs", "Exposed infrastructure", "Retest of what you fixed"],
      },
      {
        icon: "clipboard-check",
        title: "Consulting & compliance",
        description: "We get you to the standard that applies, and keep you there without slowing your team down.",
        items: ["ENS and ISO 27001", "NIS2 and DORA", "Policies and incident response"],
      },
    ],
  },
  method: {
    id: "method",
    eyebrow: "Method",
    title: "How we work",
    lede: "Four steps, every time. You always know what we're testing and what comes next.",
    steps: [
      { title: "Scope", body: "We agree what gets tested, when, and within which limits. The NDA is signed before we touch anything." },
      { title: "Test", body: "We audit with tools and by hand. If something is critical, you hear from us the same day." },
      { title: "Report", body: "Every finding with its severity, its business impact and how to fix it, ordered from highest to lowest." },
      { title: "Retest", body: "Once you've fixed it, we test it again and mark it as remediated." },
    ],
    report: {
      label: "Sample report",
      title: "Findings summary",
      columns: ["Severity", "Finding", "Status"],
      findings: [
        { level: "critical", title: "SQL injection in search", status: "Fixed", remediated: true },
        { level: "high", title: "IDOR in the invoices API", status: "Fixed", remediated: true },
        { level: "medium", title: "Missing CSP on the dashboard", status: "In progress" },
        { level: "low", title: "Server version disclosed", status: "Accepted" },
      ],
    },
  },
  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "Tell us what you need",
    lede: "We'll reply with a proposed scope and a timeline. No commitment, no sales calls.",
    form: {
      name: "Name",
      email: "Work email",
      emailPlaceholder: "name@company.com",
      company: "Company",
      need: "What do you need?",
      pick: "Choose one",
      options: ["Security audit", "Penetration testing", "Consulting & compliance", "Report a security issue", "Something else"],
      message: "Tell us the context",
      messageHint: "Rough scope, timelines, regulations that apply. Nothing confidential yet.",
      optional: "(optional)",
      consent: ["I accept the ", { label: "privacy policy", href: "/en/privacy/" }, " and agree that offby1 may contact me about this request."],
      submit: "Request a proposal",
      sending: "Sending",
      note: "We reply within one business day.",
      sent: "Received. We'll write back within one business day.",
      failed: "We couldn't send it. Try again in a few minutes.",
      errors: {
        required: "This field is required.",
        email: "Check the format: name@company.com",
        consent: "We need your consent to reply.",
        tooLong: "That's too long. Try a shorter version.",
      },
    },
  },
  footer: {
    tagline: "Cybersecurity audits and consulting for teams that can't afford to be off by one.",
    columns: [
      {
        title: "Services",
        links: [
          { label: "Security audit", href: "#services" },
          { label: "Penetration testing", href: "#services" },
          { label: "Consulting & compliance", href: "#services" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Method", href: "#method" },
          { label: "Research", href: "/en/research/" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Security",
        links: [
          { label: "security.txt", href: "/.well-known/security.txt" },
          { label: "Responsible disclosure", href: "/en/disclosure/" },
        ],
      },
    ],
    legal: [
      { label: "Legal notice", href: "/en/legal/" },
      { label: "Privacy", href: "/en/privacy/" },
      { label: "Cookies", href: "/en/cookies/" },
    ],
  },
  pages: {
    back: { label: "Back to home", href: "/en/" },
    updated: "Last updated",
    list: {
      legal: {
        path: "/en/legal/",
        title: "Legal notice",
        noindex: true,
        sections: [
          {
            heading: "Owner",
            paragraphs: [
              "As required by article 10 of Spain's Law 34/2002 on information society services and e-commerce (LSSI-CE), these are the details of the owner of offby1.cc:",
            ],
            items: [
              `Owner: ${OWNER.name}`,
              `Tax ID (NIF): ${OWNER.taxId}`,
              `Address: ${OWNER.addressEn}`,
              `Email: ${OWNER.email}`,
            ],
          },
          {
            heading: "What this site is",
            paragraphs: [
              "offby1.cc presents offby1's security audit, penetration testing and consulting services, and lets you request a proposal through the contact form. Using it doesn't create any contract: every engagement is agreed in writing, with its scope.",
            ],
          },
          {
            heading: "Content",
            paragraphs: [
              "We keep the information accurate and current, but it's for guidance and may change without notice. The audit examples on the site (logs, findings, reports) are illustrative and don't belong to any client.",
              "When we link to third-party sites, we aren't responsible for what they publish.",
            ],
          },
          {
            heading: "Intellectual property",
            paragraphs: [
              "offby1's texts, design and logo belong to their owner. You may quote them with attribution; for any other use, ask first. The Instrument Sans and JetBrains Mono typefaces are used under the SIL Open Font License.",
            ],
          },
          {
            heading: "Governing law",
            paragraphs: ["This legal notice is governed by Spanish law."],
          },
        ],
      },
      privacy: {
        path: "/en/privacy/",
        title: "Privacy policy",
        noindex: true,
        sections: [
          {
            heading: "Controller",
            items: [
              `Controller: ${OWNER.name}`,
              `Tax ID (NIF): ${OWNER.taxId}`,
              `Address: ${OWNER.addressEn}`,
              `Email: ${OWNER.email}`,
            ],
          },
          {
            heading: "What data we process",
            items: [
              "If you use the contact form: your name and email and, if you give them, your company, the service you're interested in and the context you share.",
              "For every visit: the IP address, date and time, page requested and browser, in the server's logs.",
              "For every visit, also how the site performs in your browser: load times, errors, slow resources, clicks, your device and browser type, and an approximate location (country and city) derived from the IP. Nothing is stored on your device for this, and we don't identify you.",
            ],
          },
          {
            heading: "Why, and on what basis",
            items: [
              "To answer your request and, if you ask, prepare a proposal. The basis is your consent (art. 6(1)(a) GDPR), given when you send the form, which you can withdraw at any time.",
              "To keep the site secure and running: detecting abuse and attacks. The basis is our legitimate interest (art. 6(1)(f) GDPR).",
              "To measure and improve the site's performance and fix its errors. The basis is our legitimate interest (art. 6(1)(f) GDPR).",
            ],
            paragraphs: [
              "We don't use your data for advertising, we don't build profiles, and we don't make automated decisions about you.",
            ],
          },
          {
            heading: "How long",
            items: [
              "Form data: as long as needed to handle your request, and at most 12 months after our last contact. If we agree an engagement, as long as the law requires.",
              "Server logs and performance measurements: 30 days. System backups may keep them for up to 6 months.",
            ],
          },
          {
            heading: "Who else processes it",
            items: [
              "Cloudflare, Inc. serves the site and protects it from attacks: visits go through its network. It may process data outside the European Union, under the EU-US Data Privacy Framework and standard contractual clauses.",
              "Hetzner Online GmbH hosts our servers, in data centres in the European Union.",
            ],
            paragraphs: ["We don't share your data with anyone else, unless the law requires it."],
          },
          {
            heading: "Your rights",
            paragraphs: [
              `You can ask to access, correct, erase, restrict or port your data, object to its processing, and withdraw your consent by writing to ${OWNER.email} from the address you contacted us with.`,
              "If you think we haven't handled your data properly, you can complain to the Spanish Data Protection Agency (aepd.es).",
            ],
          },
          {
            heading: "Cookies",
            paragraphs: ["This site uses no cookies. The details are on the cookies page."],
          },
        ],
      },
      cookies: {
        path: "/en/cookies/",
        title: "Cookies",
        sections: [
          {
            paragraphs: [
              "This site sets no cookies: none of its own and none from third parties, no analytics and no advertising. That's why we show no banner and ask for no consent.",
            ],
          },
          {
            heading: "The one thing your browser keeps",
            paragraphs: [
              "If you choose the light or dark theme, your browser keeps that preference in its local storage (the key offby1-theme) to remember it next time. It's only stored if you choose it, it's never sent to our server, and it goes away if you switch back to “Match the system” or clear the site's data.",
              "If you choose a language on the ES / EN switch, your browser keeps that choice in its local storage (the key offby1-lang). Without it, on your first visit we show the site in your device's language: Spanish if it is Spanish, Catalan, Galician or Basque, and English otherwise. Your own browser makes that decision, it's never sent to our server, and it goes away if you clear the site's data.",
            ],
          },
          {
            heading: "If this changes",
            paragraphs: [
              "If we ever use cookies, we'll update this page and ask for your permission before setting any that isn't strictly necessary.",
            ],
          },
        ],
      },
      disclosure: {
        path: "/en/disclosure/",
        title: "Responsible disclosure",
        sections: [
          {
            paragraphs: [
              "If you've found a security flaw in offby1.cc or any system of ours, we want to know.",
              "Use the contact form and choose “Report a security issue”. Tell us what you saw and how to reproduce it. We'll reply within 3 business days and keep you posted.",
              "Don't access other people's data, don't degrade the service, and give us reasonable time to fix it before you publish. If you do that, we won't take any action against you.",
            ],
          },
        ],
      },
    },
  },
};
