"use client";

import Link from "next/link";
//import { useTheme } from "next-themes";
import { //Sun, Moon, 
  Home } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";
import { getUserInfo, UserInfo } from "@/lib/services/userService";

export default function NavBar() {
  //const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // 다크모드 용 훅
  const pathname = usePathname(); // 현재 경로를 확인하는 훅
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/blog", label: "BLOG" },
    //{ href: "/portfolios", label: "게시판" },
    //{ href: "/resume", label: "RESUME"},
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
        setIsAuthenticated(true)
      } catch (e: unknown) {
        console.log(e)
        setIsAuthenticated(false)
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="h-14  sticky top-0 z-50 w-full border-b flex justify-center items-center bg-background">
      <div className="flex w-full max-w-screen-xl mx-auto items-center justify-between px-5">
        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium gap-2">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors py-3 text-primary flex items-center ${
                  isActive
                    ? "underline underline-offset-4 font-black"
                    : "hover:font-black font-bold"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {/* 다크모드 전환 */}
          {/* <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center border border-primary bg-transparent hover:border-2 h-8 w-8 rounded-full"
            aria-label="Toggle theme"
          >
            {mounted &&
              (theme === "dark" ? (
                <Moon className="h-5 w-5 text-primary stroke-1" />
              ) : (
                <Sun className="h-5 w-5 text-primary stroke-1" />
              ))}
          </button> */}

          {/* 홈페이지로 리다이렉트 */}
          <Link href="/" className="font-extrabold">
            <button className="inline-flex items-center justify-center border border-primary bg-transparent hover:border-2 h-8 w-8 rounded-full">
              <Home className="h-5 w-5 text-primary stroke-1" />
            </button>
          </Link>
          {/* 로그인, 회원가입 버튼  // 유저 정보 버튼 */}
          {isAuthenticated ? (
            <UserDropdown userInfo={userInfo} />
          ) : (
            <>
              {/* 로그인 버튼 */}
              <Link
                href="/login"
                className="inline-flex items-center justify-center border border-primary bg-black text-white hover:border-2 h-8 p-3 w-auto rounded-full"
              >
                로그인
              </Link>
              {/* 회원가입 버튼 */}
              <Link
                href="/signup"
                className="inline-flex items-center justify-center border border-gray-400 bg-white text-black hover:border-2 h-8 p-3 w-auto rounded-full"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right side: theme toggle & home */}
    </header>
  );
}
