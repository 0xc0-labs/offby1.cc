// Shared by the browser and the server: the server never trusts the browser's check.

export const LIMITS = { name: 120, email: 254, company: 120, need: 80, message: 4000 } as const;

export type ContactField = keyof typeof LIMITS | "consent";
export type ContactError = "required" | "email" | "consent" | "tooLong";

export interface ContactData {
  name: string;
  email: string;
  company: string;
  need: string;
  message: string;
  consent: boolean;
  /** Honeypot: hidden from people, filled in by bots. */
  website: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContact(input: unknown): ContactData {
  const o = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string).trim() : "");
  return {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    need: str("need"),
    message: str("message"),
    consent: o.consent === true || o.consent === "on",
    website: str("website"),
  };
}

export function validateContact(d: ContactData): Partial<Record<ContactField, ContactError>> {
  const errors: Partial<Record<ContactField, ContactError>> = {};
  for (const k of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (d[k].length > LIMITS[k]) errors[k] = "tooLong";
  }
  if (!d.name) errors.name = "required";
  if (!d.email) errors.email = "required";
  else if (!errors.email && !EMAIL.test(d.email)) errors.email = "email";
  if (!d.consent) errors.consent = "consent";
  return errors;
}
