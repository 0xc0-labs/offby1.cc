import { headers } from "next/headers";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { LAB_EMAIL, LAB_PROBE, type LabVariant } from "@/lib/lab";
import { LabProbe } from "./LabProbe";
import styles from "./Lab.module.css";

const VARIANTS: Record<LabVariant, { title: string; setup: string[]; expect: string }> = {
  strict: {
    title: "1 · 'strict-dynamic' blocks the decoder",
    setup: [
      "CSP: script-src 'self' 'nonce-…' 'strict-dynamic'.",
      "The address is rendered inside an element React does not hydrate, so only the CSP is under test.",
    ],
    expect:
      "With 'strict-dynamic', browsers ignore 'self', so the decoder Cloudflare injects from /cdn-cgi/ is blocked: one script-src violation, and the sample keeps the obfuscated link.",
  },
  hydration: {
    title: "2 · The rewrite breaks hydration",
    setup: [
      "CSP: script-src 'self' 'nonce-…' (the decoder is allowed).",
      "The address is ordinary React text, so React hydrates the markup Cloudflare rewrote.",
    ],
    expect:
      "The edge turns the address into an <a class=\"__cf_email__\">, which React did not render. Watch the console errors, and whether the marker the page set on <html> before hydration survives.",
  },
  isolated: {
    title: "3 · Mitigation: isolate the address",
    setup: [
      "CSP: script-src 'self' 'nonce-…'.",
      "The address goes inside a <span dangerouslySetInnerHTML>, whose content React does not hydrate.",
    ],
    expect: "No CSP violation, no hydration error, the marker survives, and the decoder restores the address.",
  },
};

const ORDER: LabVariant[] = ["strict", "hydration", "isolated"];

/** One page of the email-obfuscation lab. */
export async function EmailObfuscationLab({ variant }: { variant: LabVariant }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const v = VARIANTS[variant];
  return (
    <main className={styles.page}>
      <script nonce={nonce} dangerouslySetInnerHTML={{ __html: LAB_PROBE }} />
      <p className={cx(styles.eyebrow, "label")}>offby1 lab · Cloudflare Email Obfuscation</p>
      <h1 className="heading">{v.title}</h1>
      <nav className={styles.nav} aria-label="Lab pages">
        {ORDER.map((key) => (
          <a key={key} href={`/lab/email-obfuscation/${key}/`} aria-current={key === variant ? "page" : undefined}>
            {VARIANTS[key].title.split(" · ")[0]}
          </a>
        ))}
      </nav>

      <h2 className="title">Setup</h2>
      <ul className={styles.list}>
        {v.setup.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <h2 className="title">Sample</h2>
      <p id="lab-sample" className={styles.sample}>
        Write to{" "}
        {variant === "hydration" ? LAB_EMAIL : <span dangerouslySetInnerHTML={{ __html: LAB_EMAIL }} />} about
        this page.
      </p>

      <h2 className="title">What to expect</h2>
      <p className={styles.para}>{v.expect}</p>

      <LabProbe />

      <p className={styles.meta}>
        Each page is served through Cloudflare with Email Obfuscation on, so view it at offby1.cc, not locally.
        Reload with DevTools open to see the same in the console. The address is a placeholder.{" "}
        <Link href="/en/">offby1.cc</Link>
      </p>
    </main>
  );
}
