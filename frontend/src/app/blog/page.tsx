
import PostCard from "@/components/blog/post/PostCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { getPostList } from "@/services/blog/blog.server";
import { SearchBox } from "@/components/common/SearchBox";
import Link from "next/link";

export type postsRes = {
  id: number;
  title: string;
  created_at: string;
};

export default async function BlogList({
  searchParams, // 쿼리스트링 파싱
}: {
  searchParams: Promise<{ page?: string; keyword?: string }>
}) {

  const { page, keyword } = await searchParams;

  const currentPage = Number(page ?? 1);
  const pageSize = 5;

  const res = await getPostList({ keyword, currentPage, pageSize });

  const posts = res.content
  const totalPages = res.totalPages

  const keywordList = [
    "코딩테스트"
    , "백엔드"
    , "프론트엔드"
    , "블로그"
    , "웰시코기"
  ]


  return (
    <div className="flex gap-8">
      {/* 왼쪽 사이드바: 키워드 리스트 */}
      <aside className="hidden md:flex flex-col w-60 pt-10 pr-6 border-r border-slate-200 min-h-[70vh]">
        <h3 className="text-sm font-semibold text-slate-500 mb-4 px-2">키워드</h3>
        <nav className="flex flex-col gap-1">
          {keywordList.map((keyword, index) => (
            <Link
              key={index}
              href={`?page=1&keyword=${keyword}`}
              className="px-3 py-2 text-sm rounded-md transition-colors hover:bg-slate-100 hover:text-blue-600 active:bg-slate-200"
            >
              # {keyword}
            </Link>
          ))}
        </nav>
      </aside>

      {/* 오른쪽 메인: 검색창 + 리스트 + 페이지네이션 */}
      <main className="flex-1 flex flex-col py-4">
        {/* 상단 헤더 영역: 검색창 정렬 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">게시글</h2>
          <div className="w-full max-w-[320px]">
            <SearchBox />
          </div>
        </div>

        <hr className="mb-3 border-slate-200" />

        {/* 포스트 리스트 영역 */}
        <div className="flex flex-col gap-1 mb-10">
          {posts.length > 0 ? (
            posts.map((post: postsRes) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="py-20 text-center text-slate-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>

        {/* 하단 페이지네이션 */}
        <div className="mt-auto py-4">
          <BlogPagination currentPage={currentPage} totalPages={totalPages}/>
        </div>
      </main>
    </div>
  );
}
