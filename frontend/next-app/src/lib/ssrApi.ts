import { cookies } from "next/headers";
import { api_env } from "./env";

export async function ssrApi(
  path: string,
  options: RequestInit = {}, //fetch함수에 넘길 옵션 선택
): Promise<Response> {


   // Headers 인스턴스 생성
  const headers = new Headers(options.headers);

  // 필수 헤더 설정
  headers.set("Content-Type", "application/json");

  //token 쿠키에서 가져오기
  const cookieStore = await cookies();
  const accessToken =  cookieStore.get("accessToken")?.value;
  // Authorization 헤더 설정
  if(accessToken){
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // baseurl 설정 - 환경변수 사용 / nginx로 연결
  // local : http://localhost:8089, prod : http://192.168.0.20:8080
  const base_url = api_env.INTERNAL_BASE_URL

  return await fetch(`${base_url}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
}
