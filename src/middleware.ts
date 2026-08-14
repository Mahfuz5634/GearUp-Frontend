import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const roleBasedRoutes = {
  CUSTOMER: ['/dashboard/customer', '/payment'],
  PROVIDER: ['/dashboard/provider'],
  ADMIN: ['/dashboard/admin'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;


  if (!accessToken) {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/payment')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next(); 
  }

  let decodedData: any = null;
  try {
    const payload = accessToken.split('.')[1];
    decodedData = JSON.parse(atob(payload));
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const role = decodedData?.role;


  if (role === 'CUSTOMER' && pathname.startsWith('/dashboard/customer')) return NextResponse.next();
  if (role === 'PROVIDER' && pathname.startsWith('/dashboard/provider')) return NextResponse.next();
  if (role === 'ADMIN' && pathname.startsWith('/dashboard/admin')) return NextResponse.next();
  if (role === 'CUSTOMER' && pathname.startsWith('/payment')) return NextResponse.next();


  if (pathname === '/auth/login' || pathname === '/auth/register') {
    return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, request.url));
  }

  if (pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/payment/:path*', '/auth/login', '/auth/register'],
};