"use client";

import { refreshAccessToken } from "@/lib/services/auth/authService";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RefreshAccessToken() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

 useEffect(() => {
  const tryRefresh = async () => {
    try {
      const res = await refreshAccessToken();
      if (res.status === 200) {
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
