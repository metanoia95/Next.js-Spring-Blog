"use client";

import Link from "next/link";
import { Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserInfo } from "@/lib/services/userService";
import { useUser } from "@/lib/hooks/useUser";
import UserDropdown from "./UserDropdown";

export default function Header() {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "홈" },
    { href: "/blog", label: "블로그" },
    { href: "/portfolio", label: "포트폴리오" },
  ];

  const { data, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && data) {
      setUserInfo(data);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [data, isLoading]);

  // 경로 바뀌면 모바일 메뉴 닫기 (UX 좋아짐)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b border-gray-200
        bg-white/80 backdrop-blur
      "
    >
      <div className="relative w-full max-w-screen-xl mx-auto px-6">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative py-2 transition-colors
                    ${
                      isActive
                        ? "text-black font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black"
                        : "text-gray-500 hover:text-black"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="
                sm:hidden inline-flex items-center justify-center
                h-9 w-9 rounded-full
                border border-gray-300
                text-gray-600
                hover:text-black hover:border-black
                transition
              "
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 stroke-[1.5]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[1.5]" />
              )}
            </button>

            {/* Home */}
            <Link href="/" aria-label="Home" className="
                  inline-flex items-center justify-center
                  h-9 w-9 rounded-full
                  border border-gray-300
                  text-gray-600
                  hover:text-black hover:border-black
                  transition
                ">
                <Home className="h-5 w-5 stroke-[1.5]" />
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <UserDropdown userInfo={userInfo} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="
                    inline-flex items-center justify-center
                    h-9 px-4 rounded-full
                    bg-black text-white text-sm
                    hover:bg-gray-800
                    transition
                  "
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="
                    inline-flex items-center justify-center
                    h-9 px-4 rounded-full
                    border border-gray-300
                    text-sm text-gray-700
                    hover:border-black hover:text-black
                    transition
                  "
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div
            className="
              absolute left-0 top-16 w-full
              border-b border-gray-200
              bg-white
              sm:hidden
            "
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      rounded-lg px-3 py-2 text-base font-medium transition
                      ${
                        isActive
                          ? "bg-gray-100 text-black"
                          : "text-gray-700 hover:bg-gray-50 hover:text-black"
                      }
                    `}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
