"use client";

import { initGoogleLogin } from "@/lib/services/auth/initGoogleLogin";
import { useEffect, useRef } from "react";


export default function GoogleLoginPage() {
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { 
    if (!buttonRef.current) return;
    initGoogleLogin(buttonRef.current)
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <div ref={buttonRef}></div>
    </div>
  );
}
