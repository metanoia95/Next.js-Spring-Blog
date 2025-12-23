export const api_env = {
    INTERNAL_BASE_URL: process.env.INTERNAL_BASE_URL,
    EXTERNAL_BASE_URL: process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL, // 외부에서 접근하는 URL CSR요청
    GOOGLE_CLIENT_ID : process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    JWT_SECRET : process.env.JWT_SECRET as string,
}