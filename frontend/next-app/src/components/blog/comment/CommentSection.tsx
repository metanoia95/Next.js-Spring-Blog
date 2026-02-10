import { getPostComments } from "@/services/blog/blog.server";
import CommentEditor from "./CommentEditor";
import PostComment from "./PostComment";

type CommentType = {
  id: string;
  authorId: string;
  text: string;
  created_at: string;
};


export default async function CommentSection({ id }: {
  id: string
}) {


  // 댓글정보
  const commentRes = await getPostComments(id)
  let comments = [];
  if (commentRes.ok) {
    comments = await commentRes.json();
  } else {
    const errorText = await commentRes.text();
    console.error("Comment fetch error:", errorText);
    // 필요시 빈 배열 유지 or 오류 메시지 표시
  }


  return (
    <>
      <CommentEditor postId={id} />
      <div>
        {comments.map((comment: CommentType) => {
          return (
            <PostComment
              key={comment.id}
              id={comment.id}
              authorId={comment.authorId}
              comment={comment.text}
              created_at={comment.created_at}
            />
          )
        })
        }
      </div>
    </>

  )

}