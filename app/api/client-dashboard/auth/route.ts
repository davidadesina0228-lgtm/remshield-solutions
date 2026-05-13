import { NextRequest, NextResponse } from 'next/server';

interface ClientEntry {
  id: string;
  name: string;
  sheetId: string;
  title?: string;
}

function getRegistry(): Record<string, ClientEntry> {
  const raw = process.env.CLIENT_REGISTRY;
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fall through to legacy single-code check
    }
  }
  // Legacy: single access code maps to a default client
  const legacyCode = process.env.DASHBOARD_ACCESS_CODE;
  const sheetId = process.env.GOOGLE_SHEETS_ID || '';
  if (legacyCode && sheetId) {
    return {
      [legacyCode]: { id: 'default', name: 'Client', sheetId, title: 'Campaign Intelligence Center' },
    };
  }
  return {};
}

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const registry = getRegistry();
  const entry = registry[String(code || '').trim()];

  if (!entry) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, redirect: '/client-dashboard' });
  response.cookies.set('dashboard_client_id', entry.id, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
