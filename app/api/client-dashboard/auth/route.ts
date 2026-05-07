import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const expected = process.env.DASHBOARD_ACCESS_CODE;

  if (!expected || code !== expected) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('dashboard_access', code, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
