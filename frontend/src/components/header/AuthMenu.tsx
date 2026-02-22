"use client";

import { Session } from "next-auth";
import UserDropdown from "./UserDropdown";
import Link from "next/link";


export default function AuthMenu({ session }: {
  session: Session | null
}) {

  const currentUser =
    session?.user
      ? {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
        image: session.user.image,
        name: session.user.name
      }
      : null

  return (
    <div className="flex h-16 items-center justify-between gap-3 w-full sm:w-auto">
      {/* Auth */}
      {currentUser ? (
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
                  ">
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
      }

    </div>

  );
}
