import '@/components/editors/tiptap/styles.scss'
import CommentSection from "@/components/blog/comment/CommentSection";
import Link from "next/link";
import { cookies } from "next/headers";
import { getBlogPost, getPostComments } from "@/lib/services/blogService";
import { formatDate } from '@/lib/utils/date';
import { api_env } from '@/lib/env';
import { jwtVerify } from "jose";
import PostDeleteButton from '@/components/blog/post/PostDeleteButton';

type PostPageProps = {
  // params가 Promise<{ id: string }> 타입으로 옵니다
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  debugger;
  const { id } = await params;
  const cookieStore = await cookies();  
  let isLoggedIn = false;
  const accessToken = cookieStore.get("accessToken")?.value;

 let userId: string | null = null;


  //포스트 정보
  const post = await getBlogPost(Number(id))
  let postHtml = "<p>본문을 불러올 수 없습니다.</p>";
  try {
    if (post) {
      postHtml = post.page_html
    } else {
      console.error("page_json.root.children is not an array");
    }
  } catch (e) {
    console.error("Lexical JSON 파싱 오류:", e);
  }

  // 댓글정보
  const commentRes = await getPostComments(Number(id))
  let comments = [];
  if (commentRes.ok) {
    comments = await commentRes.json();
  } else {
    const errorText = await commentRes.text();
    console.error("Comment fetch error:", errorText);
    // 필요시 빈 배열 유지 or 오류 메시지 표시
  }

  // jwt 검증으로 수정 버튼 처리
    if (accessToken) {
    try {
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(api_env.JWT_SECRET) // 혹은 process.env.JWT_SECRET
      );

      userId = payload.sub as string;
      console.log("JWT Payload:", payload);
      if(userId && userId === String(post.authorId)){
        isLoggedIn = true;
      }
    } catch (err) {
      console.error("JWT 검증 실패:", err);
    }
  }


  return (
    <div className="flex flex-col">
      <div className="post-title">{post.title}</div>
      <hr />
      <div className='flex justify-between items-center flex-row'>
        <div className="post-author p-2">작성자: {post.authorId}</div>
        <div className="flex p-2 h-16 justify-end items-center" ><p>{formatDate(post.created_at)}</p></div>
      </div>
      
      {/* 본문 */}
      <div className="tiptap prose prose-lg max-w-none">
        <div className="p-4"
        dangerouslySetInnerHTML={{__html:postHtml}}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Link
          className="mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          href={`/blog`}
        >
          {" "}
          목록{" "}
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              className="mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              href={`/blog/${post.id}/edit`}
            >
              {" "}
              수정하기{" "}
            </Link>
            <PostDeleteButton postId={post.id} />
          </>
        ) : null}
      </div>
      <CommentSection id={post.id} initialComments={comments} />
    </div>
  );
}
