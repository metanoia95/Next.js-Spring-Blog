"use client";

import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/lib/services/userService";
import { useState, useEffect, useRef } from "react";
import { logout } from "@/lib/services/auth/authService";

const UserDropdown = ({userInfo} : {userInfo : UserInfo|null}) => {
  const router = useRouter();

  const options = [
    {
      title: "회원정보 수정",
      type: "link",
      link: "/profile",
    },
     {
      title : "글쓰기",
      type : "link",
      link : "/editor"
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
  const handleOptionClick = (option: typeof options[number]) => {
    setIsOpen(false);

    if(option.type === "logout"){
      logout();
      window.location.replace("/login") //로그인 페이지로 이동
      
    }else if(option.link){
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
  <div className="relative inline-block text-left" ref={dropdownRef}>
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
      <User className="h-5 w-5 stroke-[1.5]" />
    </button>

    {isOpen && (
      <div
        className="
          absolute right-0 mt-2 w-56
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
            {userInfo?.name}
          </p>
          <p className="text-xs text-gray-500">
            {userInfo?.email}
          </p>
          {userInfo?.status_msg && (
            <p className="mt-1 text-xs text-gray-400">
              {userInfo.status_msg}
            </p>
          )}
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
    )}
  </div>)
};

export default UserDropdown;
