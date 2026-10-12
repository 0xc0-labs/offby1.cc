import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";

const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
  );

afterEach(() => vi.restoreAllMocks());

describe("POST /api/contact", () => {
  it("logs one contact.received line without the message or contact details", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

    const res = await post({
      name: "Ada",
      email: "ada@example.com",
      company: "Analytical",
      need: "audit",
      message: "secret words",
      consent: true,
    });

    expect(res.status).toBe(202);
    expect(log).toHaveBeenCalledTimes(1);
    const line = String(log.mock.calls[0][0]);
    expect(JSON.parse(line)).toMatchObject({
      level: "info",
      name: "offby1-cc",
      msg: "Contact received",
      event_name: "contact.received",
      "contact.need": "audit",
      "contact.company": true,
      "contact.message_length": 12,
    });
    expect(line).not.toContain("secret words");
    expect(line).not.toContain("ada@example.com");
  });

  it("logs nothing for a honeypot submission", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const res = await post({ website: "https://spam" });
    expect(res.status).toBe(202);
    expect(log).not.toHaveBeenCalled();
  });
});
