import { registerOTel } from "@vercel/otel";
import type { Instrumentation } from "next";

// Endpoint from OTEL_EXPORTER_OTLP_ENDPOINT (gitops); without one, as in
// `next dev`, nothing is exported.
export function register() {
  registerOTel({ serviceName: process.env.OTEL_SERVICE_NAME ?? "offby1-cc" });
}

// Next.js logs no errors in production. The digest is the one the visitor
// sees, so a report can be matched.
export const onRequestError: Instrumentation.onRequestError = (
  err,
  request,
  context,
) => {
  const error = err as Error & { digest?: string };
  console.error(
    JSON.stringify({
      level: "error",
      msg: error.message,
      digest: error.digest,
      method: request.method,
      path: request.path,
      route: context.routePath,
      route_type: context.routeType,
      render_source: context.renderSource,
    }),
  );
};
