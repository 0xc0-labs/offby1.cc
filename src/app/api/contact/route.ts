import { NextResponse } from "next/server";
import { parseContact, validateContact } from "@/lib/contact";

// Refused before parsing; the form's own limits add up to well under this.
const MAX_BODY = 16 * 1024;

/** There is no delivery (mail, CRM): the log never carries the message or contact details. */
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "unsupported media type" }, { status: 415 });
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const data = parseContact(body);
  // A bot filled the honeypot: it gets the same answer as a person, and nothing happens.
  if (data.website) return new NextResponse(null, { status: 202 });

  const errors = validateContact(data);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });

  console.info(
    JSON.stringify({
      event: "contact.received",
      need: data.need || null,
      company: Boolean(data.company),
      message_length: data.message.length,
    }),
  );
  return new NextResponse(null, { status: 202 });
}
