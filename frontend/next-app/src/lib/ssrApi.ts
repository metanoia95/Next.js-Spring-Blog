import { api_env } from "./env";

export async function ssrApi(
  path: string,
  options: RequestInit = {}, //fetch함수에 넘길 옵션 선택
): Promise<Response> {
   // Headers 인스턴스 생성
  const headers = new Headers(options.headers);

  // 필수 헤더 설정
  headers.set("Content-Type", "application/json");

  // baseurl 설정 - 환경변수 사용 / nginx로 연결
  // local : http://localhost:8089, prod : http://192.168.0.20:8080
  const base_url = api_env.SSR_API_BASE_URL
  console.log("ssrApi base_url : ", base_url);
  console.log("ssrApi path : ", path);

  return await fetch(`${base_url}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
}
