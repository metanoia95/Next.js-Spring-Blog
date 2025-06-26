"use client";

import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/lib/services/userService";
import { useState, useEffect, useRef } from "react";
import { logout } from "@/lib/services/authService";

const Dropdown = ({userInfo} : {userInfo : UserInfo|null}) => {
  const router = useRouter();

  const options = [
    {
      title: "회원정보 수정",
      type: "link",
      link: "/profile",
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
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="border-1 border-gray-300 p-2 rounded-2xl hover:bg-gray-100"
        >
          <User />
        </button>
      </div>

      {isOpen && (
        <div
          className="
        absolute right-0
        mt-1 w-52 rounded-md shadow-lg border border-gray-300 bg-white ring-1 ring-gray-300 ring-opacity-5 z-10"
        >
          <ul className="py-1 text-sm text-gray-700">
            <div className="m-4 gap-2">
              <li className="text-2xl">{userInfo?.email}</li>
              <li>{userInfo?.name}</li>
              <li>{userInfo?.status_msg}</li>
            </div>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
