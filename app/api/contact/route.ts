import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_CONTACT_WEBHOOK_URL ||
  "https://n8n.srv1121742.hstgr.cloud/webhook/contact-form-submission";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["firstName", "lastName", "email", "company"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });

    if (!n8nRes.ok) {
      console.error("n8n webhook error:", n8nRes.status, await n8nRes.text());
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
