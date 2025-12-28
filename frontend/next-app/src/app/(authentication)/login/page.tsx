"use client"; // 로그인 페이지는 통상 CSR로 처리함.


import { useEffect, useState } from "react";
import InputField from "@/components/common/InputField";
import Link from "next/link";

import { login } from "@/lib/services/auth/auth.client";

import axios from "axios";
import GoogleLoginPage from "@/components/common/Googlelogin";

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  }, [password]);



  // 로그인 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지


    try {
      await login({ email, password });
      // 로그인 후 이동
      window.location.href = '/';
    } catch (err : unknown) {
      console.error(err);
      if(axios.isAxiosError(err) &&err.response){
        alert('로그인 실패 : ' + err.response.data);
      }else{
        alert('로그인 중 알 수 없는 에러가 발생했습니다.');

      }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full">
        
        <div className="w-full md:w-1/2 max-w-md p-10 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold text-center mb-8">
            로그인
          </h1>

          <form className="space-y-5" onSubmit={handleLogin}>
            <InputField
              id="email"
              label="이메일"
              type="email"
              value={email}
              placeholder="이메일을 입력하세요"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              id="password"
              label="패스워드"
              type="password"
              value={password}
              placeholder="패스워드를 입력하세요"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              로그인
            </button>
          </form>
            <Link
              href="/signup"
              className="mt-3 block w-full text-center bg-purple-500 text-white py-2 rounded hover:bg-gray-400 transition-colors"
            >
              회원가입
            </Link>
           
           {/* 구글 로그인 */}
            <GoogleLoginPage />
        </div>
      </div>
    </div>
  );
}
