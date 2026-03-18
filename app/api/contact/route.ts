import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY || "d2b7db4c-da5e-4147-8dcf-848ecf429bde";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["firstName", "lastName", "email", "company"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New enquiry from ${body.firstName} ${body.lastName} — ${body.company}`,
        from_name: "RemShield Website",
        ...body,
      }),
    });

    if (!res.ok) {
      console.error("Web3Forms error:", res.status, await res.text());
      return NextResponse.json({ error: "Failed to send submission" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
