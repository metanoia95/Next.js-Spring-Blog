
import { jsonApi } from "@/lib/axios";
import { authApi } from "@/lib/server-api";
import { ssrApi } from "@/lib/ssrApi";

interface SignUpReq {
    email : string ;
    password : string;
    name : string;
}

interface SignUpRes {
    accessToken: string;
}



// 1. Error를 상속받는 커스텀 클래스 정의
export class RefreshError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'RefreshError';
    this.status = status;
    this.code = code;
  }
}


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
export async function refreshAccessTokenSSR(refreshToken: string) {
    const response = await ssrApi('/api/auth/refresh',
        {
            method: 'POST',
            body: JSON.stringify({
                refreshToken
            })
        })
    
    const data  = await response.json()
    if (!response.ok) {
        // 표준: status + 서버 error code를 함께 넘겨서 상위에서 분기
        const err = new RefreshError(data?.message || "refresh failed")
        err.status = response.status
        err.code = data?.code;

        throw err;
    }

    return data
}

export async function serverGoogleLogin(
    data: {
        sub: string,
        email: string,
        name: string
    }
) {

    const res = await authApi('/api/auth/login/google', {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include"
    });


    return res.json()

}

//로그아웃
export async function logout(refreshToken:string) {


    const res = await authApi('/api/auth/logout', {
        method:"POST",
        body : JSON.stringify({refreshToken : refreshToken}),
        credentials: "include"
    })
    
    return res.status
}


// 회원가입
export async function signUp(data: SignUpReq) : Promise<SignUpRes>{
    const response = await jsonApi.post('/api/auth/signup', data)
    return response.data
}
