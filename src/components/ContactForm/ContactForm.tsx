"use client";

import { useState, type FormEvent } from "react";
import { cx } from "@/lib/cx";
import { parseContact, validateContact, LIMITS, type ContactError, type ContactField } from "@/lib/contact";
import type { Content } from "@/content/types";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Icon } from "../Icon/Icon";
import { Input } from "../Input/Input";
import styles from "./ContactForm.module.css";

export interface ContactFormProps {
  copy: Content["contact"]["form"];
  lang: Content["lang"];
  className?: string;
}

type State = "idle" | "sending" | "sent" | "failed";

export function ContactForm({ copy: t, lang, className }: ContactFormProps) {
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactError>>>({});
  const [state, setState] = useState<State>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = parseContact(Object.fromEntries(new FormData(form)));
    const found = validateContact(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (res.status === 400) {
        setErrors(((await res.json()) as { errors: typeof found }).errors ?? {});
        setState("idle");
        return;
      }
      setState(res.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className={cx(styles.sent, className)} role="status">
        <Icon name="check" size={22} className={styles.sentIcon} />
        <p className="body">{t.sent}</p>
      </div>
    );
  }

  const err = (k: ContactField) => (errors[k] ? t.errors[errors[k]] : undefined);
  const [before, policy, after] = t.consent;

  return (
    <form className={cx(styles.form, className)} noValidate onSubmit={submit}>
      <div className={styles.row}>
        <Input name="name" label={t.name} autoComplete="name" maxLength={LIMITS.name} error={err("name")} required />
        <Input
          name="email"
          type="email"
          label={t.email}
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          maxLength={LIMITS.email}
          error={err("email")}
          required
        />
      </div>
      <div className={styles.row}>
        <Input name="company" label={t.company} optional={t.optional} autoComplete="organization" maxLength={LIMITS.company} error={err("company")} />
        <Input name="need" as="select" label={t.need} placeholderOption={t.pick} options={t.options} defaultValue="" />
      </div>
      <Input name="message" as="textarea" label={t.message} hint={t.messageHint} optional={t.optional} maxLength={LIMITS.message} error={err("message")} />
      {/* Honeypot: off-screen and out of the tab order; people never fill it. */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Checkbox
        name="consent"
        label={
          <>
            {before}
            <a href={policy.href}>{policy.label}</a>
            {after}
          </>
        }
        error={err("consent")}
      />
      <div className={styles.foot}>
        <Button type="submit" size="lg" icon="arrow-right" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.submit}
        </Button>
        <p className={cx(styles.note, "small")} role={state === "failed" ? "alert" : undefined}>
          {state === "failed" ? t.failed : t.note}
        </p>
      </div>
    </form>
  );
}
