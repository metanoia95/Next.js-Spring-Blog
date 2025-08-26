import '@/components/editors/tiptap/styles.scss'
import CommentSection from "@/components/blog/comment/CommentSection";
import PostDeleteButton from "@/components/common/PostDeleteButton";
//import { renderFullLexicalJson } from "@/components/editors/editor-lexical/renderLexicalHtml";
import Link from "next/link";
import { cookies } from "next/headers";
import { getBlogPost, getPostComments } from "@/lib/services/blogService";
import { formatDate } from '@/lib/utils/date';

type PostPageProps = {
  // params가 Promise<{ id: string }> 타입으로 옵니다
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const cookieStore = await cookies(); // 
  const isLoggedIn = !!cookieStore.get("accessToken");
  
  //포스트 정보
  const post = await getBlogPost(Number(id))
  

  let postHtml = "<p>본문을 불러올 수 없습니다.</p>";
  
  
  try {
    // const pageJson =
    //   typeof post.page_json === "string"
    //     ? JSON.parse(post.page_json)
    //     : post.page_json;

    if (post
      // Array.isArray(pageJson?.root?.children)
    ) {
      // 렉시컬 에디터용
      //postHtml = renderFullLexicalJson(pageJson.root.children); 
      console.log(post)
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

  return (
    <div className="flex flex-col">
      <div className="post-title">{post.title}</div>
      <hr />
      <div className="flex p-2 h-16 justify-center items-center" ><p>{formatDate(post.created_at)}</p></div>
      {/* 본문 */}
      <div className="tiptap prose prose-lg max-w-none">
        
        {/* 렉시컬 <div 
          className="mt-5 p-4 border-2 border-gray-200 min-h-96"
          dangerouslySetInnerHTML={{ __html: postHtml }}
        /> */}
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
