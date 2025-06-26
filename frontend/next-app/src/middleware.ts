// middelware.ts
// middleware.ts는 next.js에서 자동으로 탐지됨.
// 위치는 app이 있는 경우 src/ 에 위치할 것. * 다른 곳은 인식 안됨.
// 미들웨어에서는 요청가로채기& 리다이렉션만 처리할 것.

import { NextResponse, NextRequest } from "next/server";

import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/blog", "/signup", "/", "/refresh"]; // 로그인이 필요없는 경로

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value; // 액세스 토큰 쿠키 추출
  const refreshToken = request.cookies.get("refreshToken")?.value; // 리프레시 토큰

  const { pathname, search } = request.nextUrl; // 앱라우트 경로
  // 1. 공개경로 접근 시 => 토큰 여부와 상관 없이 통과.
  // 2. 액세스 토큰은 있는데 리프레시 토큰이 없는 경우 => 로그인 페이지 이동(비정상)
  // 3. 액세스 토큰x, 리프레시 토큰 O

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // ✅ 1. 공개 경로인데 refreshToken은 있고 accessToken은 없으면 → refresh로 보냄
  if (isPublicPath && refreshToken && !accessToken && pathname !== "/refresh") {
    const nextUrl = encodeURIComponent(`${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`/refresh?next=${nextUrl}`, request.url)
    );
  }

  // ✅ 2. 공개 경로는 그냥 통과
  if (isPublicPath) {
    return NextResponse.next();
  }

  // ✅ 3. 보호 경로인데 refreshToken 없으면 로그인
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ 4. accessToken이 없으면 refresh
  if (!accessToken) {
    const nextUrl = encodeURIComponent(`${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`/refresh?next=${nextUrl}`, request.url)
    );
  }

  try {
    // 공개경로가 아니면서 토큰이 있는 경우
    console.log(process.env.JWT_SECRET);
    // jwtVerify로 토큰 검증.
    await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    return NextResponse.next();
  } catch (err) {
    console.log(err);
    return NextResponse.redirect(new URL("/login", request.url)); //토큰 검증 실패 시 /login으로 리다이렉트
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"], // 모든 경로 포함
};
