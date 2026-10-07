"use client";

import { useCallback, useEffect, useState } from "react";
import { LAB_EMAIL, LAB_MARKER } from "@/lib/lab";
import styles from "./Lab.module.css";

interface Observed {
  markerKept: boolean;
  decoderInPage: boolean;
  addressReadable: boolean;
  stillObfuscated: boolean;
  csp: { directive: string; blocked: string; at: number }[];
  errors: { message: string; at: number }[];
  userAgent: string;
  checkedAt: string;
}

declare global {
  interface Window {
    __lab?: { csp: Observed["csp"]; errors: Observed["errors"] };
  }
}

function observe(): Observed {
  const sample = document.getElementById("lab-sample");
  return {
    markerKept: document.documentElement.getAttribute("data-lab-marker") === LAB_MARKER,
    decoderInPage: Boolean(document.querySelector('script[src*="email-decode"]')),
    addressReadable: Boolean(sample?.textContent?.includes(LAB_EMAIL)),
    stillObfuscated: Boolean(sample?.querySelector(".__cf_email__")),
    csp: window.__lab?.csp ?? [],
    errors: window.__lab?.errors ?? [],
    userAgent: navigator.userAgent,
    checkedAt: new Date().toISOString(),
  };
}

const yes = (v: boolean) => (v ? "yes" : "no");

/** What actually happened on this load, read from the DOM and window.__lab. */
export function LabProbe() {
  const [seen, setSeen] = useState<Observed | null>(null);
  const check = useCallback(() => setSeen(observe()), []);

  useEffect(() => {
    // After load, so Cloudflare's decoder has had its turn.
    const t = window.setTimeout(check, 1500);
    return () => window.clearTimeout(t);
  }, [check]);

  return (
    <section className={styles.probe} aria-live="polite">
      <div className={styles.probeHead}>
        <h2 className="title">What happened on this load</h2>
        <button type="button" className={styles.recheck} onClick={check}>
          Check again
        </button>
      </div>
      {seen ? (
        <>
          <table className={styles.table}>
            <tbody>
              <tr><th scope="row">Marker set on &lt;html&gt; before hydration still there</th><td>{yes(seen.markerKept)}</td></tr>
              <tr><th scope="row">Cloudflare&apos;s decoder script in the page</th><td>{yes(seen.decoderInPage)}</td></tr>
              <tr><th scope="row">Address readable in the sample</th><td>{yes(seen.addressReadable)}</td></tr>
              <tr><th scope="row">Sample still holds the obfuscated link</th><td>{yes(seen.stillObfuscated)}</td></tr>
              <tr><th scope="row">CSP violations</th><td>{seen.csp.length}</td></tr>
              <tr><th scope="row">Console errors</th><td>{seen.errors.length}</td></tr>
            </tbody>
          </table>
          {seen.csp.length ? (
            <pre className={styles.log}>{seen.csp.map((v) => `+${v.at}ms ${v.directive} blocked ${v.blocked}`).join("\n")}</pre>
          ) : null}
          {seen.errors.length ? (
            <pre className={styles.log}>{seen.errors.map((e) => `+${e.at}ms ${e.message}`).join("\n")}</pre>
          ) : null}
          <p className={styles.meta}>
            Checked {seen.checkedAt} · {seen.userAgent}
          </p>
        </>
      ) : (
        <p className={styles.meta}>Checking…</p>
      )}
    </section>
  );
}
