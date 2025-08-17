"use client";
import { api_env } from "@/lib/env";
import { googleLogin } from "./authService";
import axios from "axios";

export function initGoogleLogin(buttonEl: HTMLDivElement) {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  //GIS 스크립트 로드

  script.onload = () => {
    //스크립트가 로드되면 onload 이벤트가 발생
    if (window.google) {
      window.google.accounts.id.initialize({
        
        client_id: api_env.GOOGLE_CLIENT_ID, // 구글에서 발급받은 클라이언트 ID(환경변수 처리)
        callback: async (res: CredentialResponse) => {
          //GIS 에서 지정한 로그인 성공 시 발급되는 JWT 토큰을 처리하는 콜백함수
          if (!res.clientId || !res.credential) return;
          const userData:ICredential = decodeJWT(res.credential);
          console.log("구글 로그인 응답: ", userData);

          try {

            await googleLogin(userData);

            window.location.href = "/";
          } catch (err : unknown) {
            if (axios.isAxiosError(err) && err.response) {
              alert("로그인 실패 : " + err.response.data);
            } else {
              alert("로그인 중 알 수 없는 에러가 발생했습니다.");
            }
          }
        },
      });
      window.google.accounts.id.renderButton(buttonEl, {
        // 버튼 렌더링 옵션
        type: "standard",
        size: "large",
      });
    }
  };
  document.head.appendChild(script); // 스크립트 추가
  return () => {
    document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
  };
}

// JWT 디코딩 함수 : 구글 제공
export function decodeJWT(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
