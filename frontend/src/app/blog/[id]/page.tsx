import '@/components/editors/tiptap/styles.scss'
import CommentSection from "@/components/blog/comment/CommentSection";
import Link from "next/link";
import { formatDate } from '@/lib/utils/date';
import PostDeleteButton from '@/components/blog/post/PostDeleteButton';
import { getBlogPost } from '@/services/blog/blog.server';
import { auth } from '@/auth';

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  
  const { id } = await params; //  /app/blog/[id]
  let isAuthor = false;


  const session =  await auth();
  const user = session?.user


  //포스트 정보
  const post = await getBlogPost(id)

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


  // jwt 검증으로 수정 버튼 처리
  if (user) {
    if(user.role === 'ADMIN' || user.id == post.authorId){
      isAuthor = true;
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
          dangerouslySetInnerHTML={{ __html: postHtml }}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Link
          className="mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          href={`/blog`}>
          목록
        </Link>
        {isAuthor ? (
          <>
            <Link
              className="mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              href={`/editor?id=${post.id}`}>
              수정하기
            </Link>
            <PostDeleteButton postId={post.id} />
          </>
        ) : null}
      </div>
      <CommentSection id={post.id} />
    </div>
  );
}
