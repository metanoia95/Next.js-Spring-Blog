import { getPostList } from "@/lib/services/blogService";
import PostCard from "@/components/blog/post/PostCard";

export type postsRes = {
  id: number;
  title: string;
  created_at: string;
};

export default async function BlogList() {
  const posts = await getPostList({});


  return (
    <div>
      <div className="flex flex-1 h-full min-h-0 justify-between">
        <div>
          <h1>Blog posts</h1>
        </div>
        {/* <Link href="/editor" className="">
          글쓰기
        </Link> */}
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="flex flex-col-reverse">
        {posts.map((post: postsRes) => {
          return (
            <div key={post.id} >
              <PostCard post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
