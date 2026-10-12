import { Fragment } from "react";

// eslint-disable-next-line sonarjs/super-linear-regex -- splits the site's own static copy, never user input
const EMAIL = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/;

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${String(c.charCodeAt(0))};`);

// Cloudflare's Email Obfuscation rewrites addresses, so React must not
// hydrate them or it rebuilds the page: each one goes in via innerHTML.
export function RichText({ text }: Readonly<{ text: string }>) {
  const parts = text.split(EMAIL);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} dangerouslySetInnerHTML={{ __html: escape(part) }} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
