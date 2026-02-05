"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUserCSR } from "@/services/auth/auth.client";
import HeaderAuthMenu from "./HeaderAuthMenu";


export default function AuthMenu() {

  // const {
  //   data: currentUser,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: getCurrentUserCSR,
  //   retry: false
  // })
  // TODO 여기 수정해야함.


  const isLoading = true

  return (
    <>
      {/* Top bar */}
      <div className="flex h-16 items-center justify-between">
        {/* Right actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Auth */}
          {isLoading ? null : (
            <div className="ml-auto">
              {/* <HeaderAuthMenu currentUser={currentUser} /> */}
            </div>
          )}
        </div>
      </div>


    </>
  );
}
