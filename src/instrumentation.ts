export async function register() {
  // The SDK needs Node's APIs: the Edge runtime gets nothing.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerObservability } = await import("@0xc0-labs/observability");
    registerObservability("offby1-cc");
  }
}

export { onRequestError } from "@0xc0-labs/observability/logging";
