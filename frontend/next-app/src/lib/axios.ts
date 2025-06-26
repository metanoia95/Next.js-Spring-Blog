import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8089",  // baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' #환경변수 사용 시 
  headers: {
    "Content-Type": "application/json", // json 형식
  },
  withCredentials : true,
});



export default api;