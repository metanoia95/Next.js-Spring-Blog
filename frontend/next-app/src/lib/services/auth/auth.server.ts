import { ssrApi } from "@/lib/ssrApi";

// 현재 로그인한 사용자 정보 가져오기
export async function getCurrentUserSSR(): Promise<{
    id: number;
    email: string;
    role: string;
} | null> {
    //console.log("getCurrentUser called");
    const res = await ssrApi(`/api/auth/me`);
    //console.log("getCurrentUser response status:", res.status);
    if (!res.ok) return null;

    const user = await res.json();
    return user;
}