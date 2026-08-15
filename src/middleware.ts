import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;


  if (!accessToken) {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/payment')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next(); 
  }

  let decodedData: { role?: string } | null = null;
  try {
    const payload = accessToken.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    decodedData = JSON.parse(atob(base64));
  } catch {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const role = decodedData?.role;


  if (role === 'CUSTOMER' && pathname.startsWith('/dashboard/customer')) return NextResponse.next();
  if (role === 'PROVIDER' && pathname.startsWith('/dashboard/provider')) return NextResponse.next();
  if (role === 'ADMIN' && pathname.startsWith('/dashboard/admin')) return NextResponse.next();
  if (role === 'CUSTOMER' && pathname.startsWith('/payment')) return NextResponse.next();


  if (pathname === '/auth/login' || pathname === '/auth/register') {
    if (role) {
      return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/payment/:path*', '/auth/login', '/auth/register'],
};