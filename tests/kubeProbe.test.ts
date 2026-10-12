import {
  type Context,
  defaultTextMapGetter,
  ROOT_CONTEXT,
  trace,
  type TextMapGetter,
} from "@opentelemetry/api";
import {
  CompositePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { afterEach, describe, expect, it } from "vitest";

import { kubeProbePropagator } from "@/lib/kubeProbe";

type Carrier = Record<string, string | string[]>;

const PROBE = "kube-probe/1.33";
const TRACEPARENT = "00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01";
const TRACED = ["executing api route (app) /healthz", "GET /healthz"];

const exporter = new InMemorySpanExporter();
const tracer = new BasicTracerProvider({
  spanProcessors: [new SimpleSpanProcessor(exporter)],
}).getTracer("kubeProbe.test");

// As `@vercel/otel` builds it from `propagators: ["auto", kubeProbePropagator]`.
const propagator = new CompositePropagator({
  propagators: [new W3CTraceContextPropagator(), kubeProbePropagator],
});

// What Next.js does with an incoming request's headers: extract, then start
// its root span inside the result, and everything else under that span.
const extract = (headers: Carrier, context: Context = ROOT_CONTEXT) =>
  propagator.extract(context, headers, defaultTextMapGetter);

const traceRequest = (context: Context) => {
  const root = tracer.startSpan("GET /healthz", {}, context);
  tracer.startSpan(TRACED[0], {}, trace.setSpan(context, root)).end();
  root.end();
  return exporter.getFinishedSpans().map((span) => span.name);
};

afterEach(() => exporter.reset());

describe("kubeProbePropagator", () => {
  it("makes no span for a kubelet probe's request, nor under it", () => {
    expect(traceRequest(extract({ "user-agent": PROBE }))).toEqual([]);
  });

  it("makes none for a probe that carries a traceparent either", () => {
    expect(
      traceRequest(extract({ traceparent: TRACEPARENT, "user-agent": PROBE })),
    ).toEqual([]);
  });

  it("makes none when the User-Agent comes as an array", () => {
    expect(traceRequest(extract({ "user-agent": [PROBE] }))).toEqual([]);
  });

  it.each<[string, Carrier]>([
    [
      "a probe's User-Agent and x-forwarded-for, as through Traefik",
      { "user-agent": PROBE, "x-forwarded-for": "203.0.113.7" },
    ],
    [
      "a probe's User-Agent and an empty x-forwarded-for",
      { "user-agent": PROBE, "x-forwarded-for": "" },
    ],
    [
      "a browser's User-Agent",
      { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) Firefox/140.0" },
    ],
    ["curl's User-Agent", { "user-agent": "curl/8.14.1" }],
    ["no User-Agent", {}],
    [
      "a User-Agent that only contains the probe's",
      { "user-agent": `curl/8.14.1 ${PROBE}` },
    ],
  ])("traces a request with %s", (_, headers) => {
    expect(traceRequest(extract(headers))).toEqual(TRACED);
  });

  // Next.js fills in `x-forwarded-for` from the socket after the first
  // extraction, so a later one sees it.
  it("stays suppressed when extracted again with Next.js's own x-forwarded-for", () => {
    const filled = { "x-forwarded-for": "10.42.0.1" };
    const probe = { "user-agent": PROBE };
    const browser = { "user-agent": "Mozilla/5.0" };

    expect(
      traceRequest(extract({ ...probe, ...filled }, extract(probe))),
    ).toEqual([]);
    expect(
      traceRequest(extract({ ...browser, ...filled }, extract(browser))),
    ).toEqual(TRACED);
  });

  // Next.js extracts the proxy's (src/proxy.ts) context from a Headers
  // object, with this getter.
  it("reads the headers the proxy's way too", () => {
    const headersGetter: TextMapGetter<Headers> = {
      keys: (headers) => Array.from(headers.keys()),
      get: (headers, key) => headers.get(key) ?? undefined,
    };
    const fromHeaders = (init: Record<string, string>) =>
      propagator.extract(ROOT_CONTEXT, new Headers(init), headersGetter);

    expect(traceRequest(fromHeaders({ "user-agent": PROBE }))).toEqual([]);
    expect(
      traceRequest(
        fromHeaders({ "user-agent": PROBE, "x-forwarded-for": "203.0.113.7" }),
      ),
    ).toEqual(TRACED);
  });
});
