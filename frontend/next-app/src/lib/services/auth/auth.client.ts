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

// 인증 정보 조회
export async function getCurrentUserCSR(){
    console.log("getCurrentUserCSR called");
    const response = await jsonApi.get('/api/auth/me')
    console.log("getCurrentUserCSR response:", response.data);
    return response.data
}


//로그인
export async function login(data:LoginRequest): Promise<LoginResponse> { //Promise : 리턴 타입 지정
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
    return response.data
}

// 리프레시 토큰으로 액세스 토큰 재발급 
export async function refreshAccessToken() {
    const response = await jsonApi.post('/api/auth/refresh')
    return response.data
}   


// 구글 로그인 
export async function googleLogin(data:ICredential): Promise<LoginResponse> { //Promise : 리턴 타입 지정
    const response = await jsonApi.post('/api/auth/login/google', data);
    return response.data;    
}

