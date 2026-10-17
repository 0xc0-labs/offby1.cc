import { isValidElement, type ReactElement, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Rum } from "@/components/Rum/Rum";

vi.mock("next/headers", () => ({ headers: () => Promise.resolve(new Headers()) }));
vi.mock("next/server", () => ({ connection: () => Promise.resolve() }));
vi.mock("@/app/fonts", () => ({ sans: { variable: "sans" }, mono: { variable: "mono" } }));
vi.mock("@/app/globals.css", () => ({}));

const { default: RootLayout } = await import("@/app/layout");

function find(node: ReactNode, type: unknown): ReactElement | undefined {
  if (!isValidElement(node)) {
    return Array.isArray(node)
      ? (node as ReactNode[]).map((n) => find(n, type)).find(Boolean)
      : undefined;
  }
  if (node.type === type) return node;
  return find((node.props as { children?: ReactNode }).children, type);
}

afterEach(() => vi.unstubAllEnvs());

describe("RootLayout", () => {
  it("hands the release and the environment of the server to <Rum>", async () => {
    vi.stubEnv("APP_VERSION", "v1.2.3");
    vi.stubEnv("APP_ENVIRONMENT", "prod");
    vi.stubEnv("OPENOBSERVE_RUM_CLIENT_TOKEN", "pub-token");

    const rum = find(await RootLayout({ children: null }), Rum);

    expect(rum?.props).toMatchObject({
      clientToken: "pub-token",
      version: "v1.2.3",
      environment: "prod",
    });
  });
});
