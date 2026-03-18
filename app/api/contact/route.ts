import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbxf1pgOOgn20JTrpo0T09ZkHUPpowgsrLaq7ZTldY9Qk2sS2023mvVHF-V-fbQ4sq_SvA/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["firstName", "lastName", "email", "company"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const scriptRes = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    if (!scriptRes.ok) {
      console.error("Apps Script error:", scriptRes.status, await scriptRes.text());
      return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
