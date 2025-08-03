"use client";

import { refreshAccessToken } from "@/lib/services/authService";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RefreshAccessToken() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

 useEffect(() => {
  const tryRefresh = async () => {
    try {
      const res = await refreshAccessToken();
      console.log("토큰 갱신 응답:", res.status)
      if (res.status === 200) {
        // ✅ accessToken 쿠키가 백엔드에서 세팅된 시점
        // 👉 여기서 새로고침해야 SSR이 최신 accessToken을 인식함
        window.location.replace(next === "/refresh" ? "/" : next);
      } else {
        window.location.replace("/login");
      }
    } catch (err) {
      console.error("토큰 갱신 실패:", err);
      window.location.replace("/login");
    }
  };

  tryRefresh();
}, [next]);

  return null;
}
