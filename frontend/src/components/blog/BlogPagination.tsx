'use client'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/Pagination";
import { useSearchParams } from "next/navigation";

interface BlogPaginationProps {
    currentPage: number;
    totalPages: number; 
}


export function BlogPagination({ currentPage, totalPages }
    : BlogPaginationProps) {

    const searchParams = useSearchParams();
    // 기존 쿼리를 유지하면서 page만 바꾸는 헬퍼 함수
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `?${params.toString()}`;
    };

    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPages;

    const delta = 2; // 현재 페이지 앞뒤로 몇 개까지 보여줄지
    const range = [];
    const rangeWithDots = [];

    // 1. 항상 포함해야 하는 페이지들 계산
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || // 첫 페이지
            i === totalPages || // 마지막 페이지
            (i >= currentPage - delta && i <= currentPage + delta) // 현재 페이지 주변
        ) {
            range.push(i);
        }
    }

    // 2. 숫자 사이가 벌어지면 줄임표(...) 넣기
    let prev;
    for (const i of range) {
        if (prev) {
            if (i - prev === 2) {
                rangeWithDots.push(prev + 1);
            } else if (i - prev > 2) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        prev = i;
    }


    return (

        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={isFirstPage ? "#" : createPageURL(currentPage - 1)} />
                </PaginationItem>
                {rangeWithDots.map((page, index) => {
                    if (page === "...") {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }

                    const isCur = page == currentPage
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink href={createPageURL(page)} isActive={isCur}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })
                }
                <PaginationItem>
                    <PaginationNext href={isLastPage ? "#" : createPageURL(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}