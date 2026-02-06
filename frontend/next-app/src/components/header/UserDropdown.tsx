"use client";

import { User } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState, useEffect, useRef } from "react";
import { logout } from "@/services/auth/auth.client";
import { signOut } from "next-auth/react"
import Image from "next/image";

const UserDropdown = ({ user }: {
  user
  : { id: string; email: string; role: string; image?: string; name: string }
}) => {
  const router = useRouter();

  const options = [
    // {
    //   title: "회원정보 수정",
    //   type: "link",
    //   link: "/profile",
    // },
    {
      title: "글쓰기",
      type: "link",
      link: "/editor"
    },
    {
      title: "로그아웃",
      type: "logout",
    },

  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 드롭다운용 훅
  const handleOptionClick = async (option: typeof options[number]) => {
    setIsOpen(false);

    if (option.type === "logout") {
      logout();
      await signOut(); //auth.js 로그아웃 처리.

      window.location.replace("/login") //로그인 페이지로 이동

    } else if (option.link) {
      router.push(option.link)
    }

  };

  // 드롭다운 메뉴 바깥쪽 클릭 시 닫기기
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // 드롭다운
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="relative text-left flex" ref={dropdownRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="
        inline-flex items-center justify-center
        h-9 w-9 rounded-full
        border border-gray-300
        text-gray-600
        hover:text-black hover:border-black
        transition
      "
        aria-label="User menu"
      >
        {user.image ? (
          <Image src={user.image}
            width={36}
            height={36}
            className="rounded-full"
            alt="User Avatar" />
        ) : (
            <User className="h-5 w-5 stroke-[1.5]" />
        )}
      </button>


      {
        isOpen && (
          <div
            className="
          absolute right-0 top-7 mt-2 w-56
          rounded-xl
          bg-white
          shadow-xl
          border border-gray-200
          z-20
        "
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            {/* Actions */}
            <ul className="py-1 text-sm text-gray-700">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="
                px-4 py-2
                cursor-pointer
                hover:bg-gray-50
                transition
              "
                >
                  {option.title}
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </div >)
};

export default UserDropdown;
