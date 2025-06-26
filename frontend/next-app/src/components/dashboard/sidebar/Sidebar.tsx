'use client'

import { useState } from "react";

export default function SideBar() {

  const [isSbOpen, setIsSbOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSbOpen(!isSbOpen)

  }
  return (
    <div
      id="side_nav"
      className={`
      border-r border-gray-300 flex flex-col bg-gray-100 
      justify-between
      
      transition-transform 
      duration-300 ${
        isSbOpen ?  `w-[60px]` : `w-[300px]`
      }
    `}
      
    >
    <div className="p-2">
      <ul>
        <li> 대시보드 메인</li>
        <li> 간트차트 </li>
        <li> 칸반보드 </li>
      </ul>
    </div>
    <div className="pl-20 p-5 border-t border-gray-300" onClick={handleToggleSidebar} >
      <button>← 사이드바 닫기</button>
    </div>  
    </div>
  );
}
