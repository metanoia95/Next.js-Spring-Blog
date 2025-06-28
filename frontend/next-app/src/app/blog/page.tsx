import Link from "next/link";
import { format } from "date-fns";


  type postsRes = {
    id: number;
    title: string;
    created_at: string;
  };


export default async function BlogList() {
  const res = await fetch("http://localhost:8089/api/blog/posts", {
    cache: "no-store", // SSR 목적일 경우
  }); // 별도의 필드 주입이 없으면 get 사용

  const posts = await res.json();


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
              <Link href={`/blog/${post.id}`}>
                <div className="flex justify-between p-4 border-gray-200 border rounded-2xl mt-3 hover:bg-gray-50">
                  <span className="text-xl font-bold">{post.title}</span>
                  <span className= "text-gray-500">{format(new Date(post.created_at),"yyyy.MM.dd HH:mm")}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
