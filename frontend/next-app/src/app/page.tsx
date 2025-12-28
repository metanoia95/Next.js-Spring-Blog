import PostCard from "@/components/blog/post/PostCard";
import { postsRes } from "./blog/page";
import { getPostList } from "@/lib/services/blog/blog.server";




export default async function IndexPage() {
    const posts = await getPostList({});
  

  return (
    <div className="min-h-screen p-2">
      <div className="flex flex-col mt-4 pb-3 justify-center gap-5 border-b-1 border-gray-400 items-center" >
        <h1 className="text-4xl text-bold">Blog</h1>
        <span>프론트엔드, 백엔드, 웹, 퀀트, 알고리즘, 그외 기타 여러 것들을 다룹니다.</span>
      </div>

      <div className="mt-5">
        <h5 className="text-2xl text-bold">최근 게시글</h5>
        <div className="grid grid-cols-3 gap-4 pt-5">
            {posts.map((post: postsRes) => {
              return (
                <div key={post.id} >
                  <PostCard post={post} />
                </div>
              );
            })}
        </div>
      </div>

    </div>)
}
