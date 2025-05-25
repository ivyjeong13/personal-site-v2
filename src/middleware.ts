import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  if (hostname === 'www.ivyanddave.com' || hostname === 'ivyanddave.com') {
    return NextResponse.redirect(new URL('/wedding-invitation', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
