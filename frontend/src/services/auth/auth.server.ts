import { authApi } from "@/lib/server-api";
import { ssrApi } from "@/lib/ssrApi";

// 현재 로그인한 사용자 정보 가져오기
export async function getCurrentUserSSR(): Promise<{
    id: number;
    email: string;
    role: string;
} | null> {
    const res = await ssrApi(`/api/auth/me`);
    if (!res.ok) return null;

    const user = await res.json();
    return user;
}


// 리프레시 토큰으로 액세스 토큰 재발급 
export async function refreshAccessTokenSSR() {
    const response = await ssrApi('/api/auth/refresh', {method: 'POST'})
    return response.json();
}   

export async function serverGoogleLogin(
    data: { 
        sub: string,
        email:string,
        name:string
    } 
){
    
    const res = await authApi('/api/auth/login/google', {
        method:"POST",
        body: JSON.stringify(data),
        credentials: "include"
    });


    return res.json()

}