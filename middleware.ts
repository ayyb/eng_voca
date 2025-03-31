import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// 로그인이 필요하지 않은 public 라우트들
const publicRoutes = ['/', '/login', '/signup'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // public 라우트인지 확인
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // 로그인하지 않은 상태에서 보호된 라우트에 접근하려는 경우
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  // 로그인한 상태에서 login 또는 signup 페이지에 접근하려는 경우
  if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/home', nextUrl));
  }

  return NextResponse.next();
});

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};