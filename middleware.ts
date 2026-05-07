import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page and auth endpoint through unconditionally
  if (pathname === '/client-dashboard/login') return NextResponse.next();
  if (pathname.startsWith('/api/client-dashboard/auth')) return NextResponse.next();

  const code = process.env.DASHBOARD_ACCESS_CODE;
  if (!code) return NextResponse.next(); // gate disabled when env var not set

  const cookie = req.cookies.get('dashboard_access')?.value;
  if (cookie === code) return NextResponse.next();

  return NextResponse.redirect(new URL('/client-dashboard/login', req.url));
}

export const config = {
  matcher: ['/client-dashboard/:path*', '/api/client-dashboard/:path*'],
};
