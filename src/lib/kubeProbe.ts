import type { TextMapPropagator } from "@opentelemetry/api";
import { suppressTracing } from "@opentelemetry/core";

// The kubelet's probes make no trace, nor does anything they run (#42). A
// propagator, not a sampler: Next.js starts its root span with no header among
// its attributes, but inside the context it extracts from the request's
// headers first. With tracing suppressed there, that span and every span
// under it is non-recording, before any sampler runs.
//
// The User-Agent alone is not enough: anyone can send `kube-probe/` through
// the public tunnel and hide a request. The kubelet calls the pod directly,
// while Traefik adds `x-forwarded-for` to every request it routes, which the
// request cannot remove (gitops: platform/traefik/values.yaml).
//
// Only the first extraction sees the raw headers: Next.js then fills in
// `x-forwarded-for` itself. Under it the context stays suppressed, but the
// proxy runs detached and extracts again, so a path the proxy runs on is
// traced: `/healthz/` stays outside its matcher (src/proxy.ts).
export const kubeProbePropagator: TextMapPropagator = {
  extract: (context, carrier, getter) => {
    const userAgent = getter.get(carrier, "user-agent");
    const first = Array.isArray(userAgent) ? userAgent[0] : userAgent;
    const forwarded = getter.get(carrier, "x-forwarded-for") !== undefined;

    return first?.startsWith("kube-probe/") && !forwarded
      ? suppressTracing(context)
      : context;
  },
  fields: () => [],
  inject: () => {},
};
