export const api_env = {
    INTERNAL_BASE_URL: process.env.INTERNAL_BASE_URL,
    EXTERNAL_BASE_URL: process.env.EXTERNAL_BASE_URL,
    GOOGLE_CLIENT_ID : process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    JWT_SECRET : process.env.JWT_SECRET as string,
}