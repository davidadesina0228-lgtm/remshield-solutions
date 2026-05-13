import { NextRequest, NextResponse } from 'next/server';

function validClientIds(): Set<string> {
  const raw = process.env.CLIENT_REGISTRY;
  if (raw) {
    try {
      const registry = JSON.parse(raw) as Record<string, { id: string }>;
      return new Set(Object.values(registry).map(e => e.id));
    } catch {
      // fall through
    }
  }
  // Legacy single-code mode
  const legacyCode = process.env.DASHBOARD_ACCESS_CODE;
  if (legacyCode) return new Set(['default']);
  return new Set();
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page and auth endpoint unconditionally
  if (pathname === '/client-dashboard/login') return NextResponse.next();
  if (pathname.startsWith('/api/client-dashboard/auth')) return NextResponse.next();

  const ids = validClientIds();
  if (ids.size === 0) return NextResponse.next(); // gate disabled when no env vars set

  const clientId = req.cookies.get('dashboard_client_id')?.value;
  if (clientId && ids.has(clientId)) return NextResponse.next();

  // Legacy cookie fallback (clients who logged in before the multi-tenant update)
  const legacyCode = process.env.DASHBOARD_ACCESS_CODE;
  if (legacyCode) {
    const legacyCookie = req.cookies.get('dashboard_access')?.value;
    if (legacyCookie === legacyCode) return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/client-dashboard/login', req.url));
}

export const config = {
  matcher: ['/client-dashboard/:path*', '/api/client-dashboard/:path*'],
};
