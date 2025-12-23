import {jsonApi} from "@/lib/axios";

interface LoginRequest {
    email : string ;
    password : string;

}

interface LoginResponse{
    accessToken: string;
}


interface SignUpReq {
    email : string ;
    password : string;
    name : string;
}

interface SignUpRes {
    accessToken: string;
}



//로그인
export async function login(data:LoginRequest): Promise<LoginResponse> { //Promise : 리턴 타입 지정
    console.log("로그인 요청 데이터: ", data);
    const response = await jsonApi.post('/api/auth/login', data);
    return response.data;
    
}

//로그아웃
export async function logout() {

    await jsonApi.post('/api/auth/logout')
    
}

// 회원가입
export async function signUp(data: SignUpReq) : Promise<SignUpRes>{

    const response = await jsonApi.post('/api/auth/signup', data)
    console.log(response.data)
    return response.data
}

// 리프레시 토큰으로 액세스 토큰 재발급 
export async function refreshAccessToken() {
    const response = await jsonApi.post('/api/auth/refresh')
    return response
}   


// 구글 로그인 
export async function googleLogin(data:ICredential): Promise<LoginResponse> { //Promise : 리턴 타입 지정
    const response = await jsonApi.post('/api/auth/login/google', data);
    return response.data;
    
}