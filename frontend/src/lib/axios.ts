import axios from "axios";
import { api_env } from "./env";
import { auth } from "@/auth";

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
jsonApi.interceptors.request.use(
  async function (config){
    const session = await auth();

    if(session?.accessToken){
      
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }


    return config;
  }, function(error){

    return Promise.reject(error);
  }
)


// 응답 인터셉터 추가하기
jsonApi.interceptors.response.use(
  function (response) { // 2xx 범위
    
    return response;
  }, async function (error) { // 2xx 외 범위
    console.log("axios response error:", error.response);
  
    return Promise.reject(error);
  });

