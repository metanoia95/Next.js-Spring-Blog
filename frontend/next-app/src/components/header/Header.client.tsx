"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserCSR } from "@/lib/services/auth/auth.client";
import HeaderAuthMenu from "./HeaderAuthMenu";


export default function HeaderClient() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const { 
    data: currentUser,
    isLoading,
   } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserCSR,
    retry : false
  })

  const navLinks = [
    { href: "/", label: "홈" },
    { href: "/blog", label: "블로그" },
    { href: "/portfolio", label: "포트폴리오" },
  ];

  

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
          {/* Navigation */}
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
          <div className="flex items-center gap-3 w-full sm:w-auto">
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

            {/* Auth */}
            { isLoading ? null : (
              <div className= "ml-auto">
                <HeaderAuthMenu currentUser = {currentUser} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
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
