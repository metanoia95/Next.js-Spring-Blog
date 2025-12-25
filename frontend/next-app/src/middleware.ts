// middelware.ts
// middleware.ts는 next.js에서 자동으로 탐지됨.
// 위치는 app이 있는 경우 src/ 에 위치할 것. * 다른 곳은 인식 안됨.
// 미들웨어에서는 요청가로채기& 리다이렉션만 처리할 것.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { api_env } from "./lib/env";

const PROTECTED_PATHS = ["/editor"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // 1. 보호 페이지 아니면 통과
  if(!isProtectedPath){
    return NextResponse.next();
  }

  // 2. 토큰 가져오기
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 3️. 보호 페이지
  // 3.1.  refreshToken 없으면 로그인
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3.2. accessToken 없으면 refresh
  if (!accessToken) {
    const nextUrl = encodeURIComponent(`${pathname}${search}`);
    return NextResponse.redirect(
      new URL(`/refresh?next=${nextUrl}`, request.url)
    );
  }

  // 5️. 나머지는 통과
  try{
    await jwtVerify(
      accessToken,
      new TextEncoder().encode(api_env.JWT_SECRET)
    );

  }catch{
    alert("권한이 없습니다.")
  }

  
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};