
import PostCard from "@/components/blog/post/PostCard";
import { Pagination } from "@/components/common/Pagination";
import { getPostList } from "@/lib/services/blog/blog.server";

export type postsRes = {
  id: number;
  title: string;
  created_at: string;
};

export default async function BlogList({
  searchParams, // 쿼리스트링 파싱
}: {
  searchParams: Promise<{ page? : string}>
}) {
  const { page } = await searchParams;

  const currentPage = Number(page ?? 1);
  const pageSize = 10;

  const posts = await getPostList({ currentPage, pageSize });


  return (
    <div>
      <div className="flex flex-1 h-full min-h-0 justify-between">
        <div>
          <h1>Blog posts</h1>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="flex flex-col">
        {posts.map((post: postsRes) => {
          return (
            <div key={post.id} >
              <PostCard post={post} />
            </div>
          );
        })}
      </div>
      <Pagination currentPage={currentPage} />
    </div>
  );
}
