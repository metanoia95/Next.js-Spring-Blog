// middelware.ts
// middleware.ts는 next.js에서 자동으로 탐지됨.
// 위치는 app이 있는 경우 src/ 에 위치할 것. * 다른 곳은 인식 안됨.
// 미들웨어에서는 요청가로채기& 리다이렉션만 처리할 것.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1️⃣ 인증 관련 페이지는 무조건 통과
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/refresh"
  ) {
    return NextResponse.next();
  }

  // 2️⃣ 공개 페이지
  if (pathname === "/" || pathname.startsWith("/blog")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 3️⃣ 보호 페이지: refreshToken 없으면 로그인
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4️⃣ accessToken 없으면 refresh
  if (!accessToken) {
    const nextUrl = encodeURIComponent(`${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`/refresh?next=${nextUrl}`, request.url)
    );
  }

  // 5️⃣ 나머지는 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};