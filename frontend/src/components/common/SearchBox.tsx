'use client'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import { useRouter,useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBox() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword")?? "")

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1") // 검색 시 항상 1페이지 부터
    params.set("keyword", keyword)

    router.push(`?${params.toString()}`)

  }


  return (
      <InputGroup>
        <InputGroupInput 
        id="inline-start-input" 
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(); // 엔터키 지원
        }}
        />
        <InputGroupAddon 
        align="inline-start"
        onClick={handleSearch} 
        className="cursor-pointer"
        >
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
  )
}
