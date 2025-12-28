import axios from "axios";
import { api_env } from "./env";
import { refreshAccessToken } from "./services/auth/auth.client";

export const jsonApi = axios.create({
  baseURL: api_env.EXTERNAL_BASE_URL,  // baseURL: process.env.NEXT_PUBLIC_API_URL
  headers: {
    "Content-Type": "application/json", // json 형식
  },
  withCredentials : true,
});


export const fileApi = axios.create({
  baseURL: api_env.EXTERNAL_BASE_URL,  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' #환경변수 사용 시 
  headers: {},
  withCredentials : true,
});


// 응답 인터셉터 추가하기
jsonApi.interceptors.response.use(
  function (response) { // 2xx 범위
    
    return response;
  }, async function (error) { // 2xx 외 범위
    console.log("axios response error:", error.response);
    if(error.response && error.response.status === 401){ // 401 Unauthorized (액세스 토큰 없음)
      // refresh 토큰을 사용하여 새로운 액세스 토큰 요청
      const res = await refreshAccessToken();
      console.log("refresh token response:", res);
    }

    return Promise.reject(error);
  });

