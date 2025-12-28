"use client";
import Link from "next/link";
import UserDropdown from "./UserDropdown";

export default function HeaderAuthMenu({currentUser} 
    : {currentUser : {id: number; email: string; role: string} | null}) {

    return(
        currentUser ? (
              <UserDropdown user={currentUser} />
            ) : (
              <div className="flex gap-2">
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
              </div>
            )

    )
}