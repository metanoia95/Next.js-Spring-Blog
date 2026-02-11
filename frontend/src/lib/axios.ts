import axios from "axios";
import { api_env } from "./env";
import { refreshAccessToken } from "../services/auth/auth.client";

export const jsonApi = axios.create({
  baseURL: api_env.INTERNAL_BASE_URL,  // bff처리하면 모두 내부로 처리
  headers: {
    "Content-Type": "application/json", // json 형식
  },
  withCredentials : true,
});



export const fileApi = axios.create({
  baseURL: api_env.INTERNAL_BASE_URL,  // bff처리하면 모두 내부로 처리
  headers: {},
  withCredentials : true,
});

// 리퀘스트 헤더 추가





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

