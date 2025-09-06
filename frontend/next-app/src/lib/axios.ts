import axios from "axios";
import { api_env } from "./env";

export const api = axios.create({
  baseURL: api_env.EXTERNAL_BASE_URL,  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' #환경변수 사용 시 
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
