import CommentSection from "@/components/blog/comment/CommentSection";
import PostDeleteButton from "@/components/common/PostDeleteButton";
import { renderFullLexicalJson } from "@/components/editor/renderLexicalHtml";
import Link from "next/link";

type PostPageProps = {
  // params가 Promise<{ id: string }> 타입으로 옵니다
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  //포스트 정보
  const postRes = await fetch(`http://localhost:8089/api/blog/posts/${id}`, {
    cache: "no-store", // SSR 목적일 경우
  }); // 별도의 필드 주입이 없으면 get 사용

  const post = await postRes.json();
  console.log("Post data:", post.page_json);

  let postHtml = "<p>본문을 불러올 수 없습니다.</p>";

  try {
    const pageJson =
      typeof post.page_json === "string"
        ? JSON.parse(post.page_json)
        : post.page_json;

    if (Array.isArray(pageJson?.root?.children)) {
      postHtml = renderFullLexicalJson(pageJson.root.children);
    } else {
      console.error("page_json.root.children is not an array");
    }
  } catch (e) {
    console.error("Lexical JSON 파싱 오류:", e);
  }

  // 댓글정보
  const commentRes = await fetch(
    `http://localhost:8089/api/blog/comments/${id}`,
    {
      cache: "no-store",
    }
  );
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
      <div className="prose prose-lg max-w-none">
        {/* 본문 */}
        <div
          className="mt-5 p-4 border-2 border-gray-200 min-h-96"
          dangerouslySetInnerHTML={{ __html: postHtml }}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Link
          className="mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          href={`/blog/${post.id}/edit`}
        >
          {" "}
          수정하기{" "}
        </Link>
        <PostDeleteButton postId={post.id} />
      </div>
      <CommentSection postId={post.id} initialComments={comments} />
    </div>
  );
}
