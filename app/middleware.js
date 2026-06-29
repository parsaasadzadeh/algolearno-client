import { NextResponse } from 'next/server';

export function middleware(request) {
  // ۱. خواندن توکن از کوکی مرورگر
  const token = request.cookies.get('token')?.value;
  
  // مسیری که کاربر می‌خواهد به آن برود
  const { pathname } = request.nextUrl;

  // ۲. مسیرهایی که نیاز به لاگین دارند (محافظت شده)
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/complete-profile');

  // ۳. اگر مسیر محافظت شده بود و توکن نداشت، پرتش کن به صفحه اصلی
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ۴. اگر توکن داشت و خواست بره صفحه لاگین (صفحه اصلی)، بفرستش داشبورد
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// تنظیم می‌کنیم که این نگهبان فقط روی مسیرهای خاصی فعال شود
export const config = {
  matcher: ['/', '/dashboard/:path*', '/complete-profile/:path*'],
};