# offby1.cc

The landing page of offby1, at https://offby1.cc: a Next.js app built on the
offby1 design system (claude.ai/artifact/KfETJAuPgCxKXv9s4sczkp), served by
its own Node server in the homelab cluster.

## Run it

Every tool comes from `mise.toml`.

```sh
mise install
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm build
pnpm start        # the standalone server, as the image runs it
```

## Layout

```
src/
  app/layout.tsx      the one root layout; <html lang> from the path
  app/(es)/           /, and the Spanish text pages
  app/en/             /en/, and the English ones
  app/api/contact/    the contact form's endpoint
  app/healthz/        the probes'
  components/         the design system's components, ported 1:1 (TSX + CSS Modules)
  content/            the copy, one file per language, written separately
  styles/tokens.css   the design system's tokens, generated from its tokens.json
  proxy.ts            the per-request Content-Security-Policy
public/               favicon, .well-known/security.txt
```

## Design system

The components keep the design system's API (`index.d.ts`) and styles
(`bundle.css`); the tokens are its `tokens.json`. A visual change starts in
the design system and is ported here, never the other way round. Dark is the
brand theme and the default. The NavBar's theme switch offers system (the
default: `prefers-color-scheme` decides), light and dark; a choice is kept in
`localStorage` and set as `data-theme` on `<html>` by an inline script, with
the CSP nonce, before the first paint. The sun, moon and monitor icons are
Lucide's, kept apart (`Icon/extra-icons.ts`) until the design system has them.

## Content

The copy is the design system's sample: services, standards and timelines
are **provisional** until the real offering replaces them.

The site has no contact address: the form is the only way in, for security
reports too (`security.txt` points at it). The owner's details
(`src/content/owner.ts`) appear only in the legal notice and the privacy
policy, as the law requires, and both are `noindex` and out of the sitemap.
The site sets no cookies; the cookies page says so.

## Security headers

The app sets only the Content-Security-Policy, with a fresh nonce per
request (`src/proxy.ts`), so every page renders per request. Scripts run
with that nonce or from this origin, which lets Cloudflare's own scripts under
`/cdn-cgi/` run: Email Obfuscation stays on, and addresses are rendered so
React doesn't hydrate them (`components/Email/RichText.tsx`). The other
headers are Traefik's, in gitops: the baseline on every entrypoint (HSTS,
nosniff, Referrer-Policy: `platform/traefik/security-headers.yaml`) and this
site's own on its route (framing, Permissions-Policy, COOP/CORP:
`apps/offby1-cc/httproute.yaml`).

## Contact form

`POST /api/contact/` checks the form again on the server (`src/lib/contact.ts`
is shared with the browser) and answers 202. Delivery is not wired yet: the
handler logs that a request arrived, without the message or the contact's
details.

## Delivery

Trunk-based: `main` is the trunk, every change is a short-lived
`<type>/<slug>` branch and a squash-merged PR. CI (`.github/workflows/ci.yml`,
steps in `0xc0-labs/.github`) lints, type-checks and builds every PR, and
builds the image. Every push to `main` publishes
`ghcr.io/0xc0-labs/offby1.cc` as `sha-<7>` and `main`; the job summary
prints the `tag@digest` that gitops pins in `apps/offby1-cc/deployment.yaml`.
