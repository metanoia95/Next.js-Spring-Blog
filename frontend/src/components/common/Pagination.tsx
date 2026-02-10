import Link from "next/link";


export async function Pagination({ currentPage }: { currentPage: number }) {



    return (
        <div className="flex items-center justify-center space-x-4 mt-6">
            {/* 이전 */}
            {currentPage > 1 ? (
                <Link
                    href={`?page=${currentPage - 1}`}
                    className="inline-flex items-center justify-center
            h-9 px-4 rounded-full border border-gray-300
            text-sm text-gray-700 hover:border-black hover:text-black"
                >
                    이전
                </Link>
            ) : (
                <span
                    className="inline-flex items-center justify-center
            h-9 px-4 rounded-full border border-gray-200
            text-sm text-gray-400"
                >
                    이전
                </span>
            )}
            <p>{currentPage}</p>
            <Link className=" inline-flex items-center justify-center
                    h-9 px-4 rounded-full
                    border border-gray-300
                    text-sm text-gray-700
                    hover:border-black hover:text-black
                    transition"
                href={`?page=${currentPage + 1}`}> 다음 </Link>
        </div>
    )
}