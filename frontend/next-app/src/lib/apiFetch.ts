export async function apiFetch(
  path: string,
  options: RequestInit = {}, //fetch함수에 넘길 옵션 선택
  cookieHeader?: string
): Promise<Response> {
  //const cookieHeader = cookies().toString();  // "accessToken=…; refreshToken=…"
   // Headers 인스턴스 생성
  const headers = new Headers(options.headers);

  // 필수 헤더 설정
  headers.set("Content-Type", "application/json");

  // 쿠키가 있으면 세팅
  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  return await fetch(`http://localhost:8089${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
}
