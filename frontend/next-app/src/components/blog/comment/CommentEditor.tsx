'use client'
import { refreshPath } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function CommentEditor({
    postId, 
}: {
    postId: string,
}) {
    const router = useRouter();
    const [text, setText] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const { data: session } = useSession()
    
    useEffect(() => {
        if (session?.user) {
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }}, [session])


    // 댓글 저장 핸들러
    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
        }
        try {
            // const dto: SaveCommentReq = {
            //     post_id: postId,
            //     text: text
            // }
            
            // await SaveComment(dto); // TODO bff 처리
            // onCommentSubmit(); // 댓글 목록 갱신
            console.log("저장.")
            await refreshPath(`/blog/${postId}`)



        } catch (err: unknown) {
            console.log(err)
        }
    }

    const handleNavigateToLogin = () => {
        router.push("/login")
    }

   
const isDisabled = !isLoggedIn;

return (
  <form
    className="flex flex-col mt-3 p-3 gap-3 rounded-[6px] bg-gray-200"
    onSubmit={isLoggedIn ? handleComment : undefined}
  >
    <textarea
      value={text}
      placeholder={
        isLoggedIn
          ? "댓글을 입력하세요"
          : "로그인 후 댓글을 작성할 수 있습니다."
      }
      className="p-2 min-h-16 bg-white"
      disabled={isDisabled}
      onChange={(e) => setText(e.target.value)}
    />

    <div className="flex justify-end">
      {isLoggedIn ? (
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          댓글 작성
        </button>
      ) : (
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleNavigateToLogin}
        >
          로그인
        </button>
      )}
    </div>
  </form>
);

}

