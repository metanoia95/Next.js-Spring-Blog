'use client'

import { useUser } from "@/lib/hooks/useUser";
import { SaveComment, SaveCommentReq } from "@/lib/services/blog/blogService"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function CommentEditor({
    postId,
    onCommentSubmit
}: {
    postId: number,
    onCommentSubmit: () => void
}) {
    const router = useRouter();
    const [text, setText] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { data, isLoading, isError } = useUser(); // 사용자 정보 훅
    
    useEffect(() => {
        if (!isLoading && data) {
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }}, [data,isLoading])


    // 댓글 저장 핸들러
    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            return;
        }
        try {
            const dto: SaveCommentReq = {
                post_id: postId,
                text: text
            }
            await SaveComment(dto);
            onCommentSubmit(); // 댓글 목록 갱신

        } catch (err: unknown) {
            console.log(err)
        }
    }

    const handleNavigateToLogin = () => {
        debugger;
        router.push("/login")
    }

   

    return (
        isLoggedIn ? (
             <form
                className="
                flex flex-col
                mt-3 p-3 gap-3
                 rounded-[6px]
                 bg-gray-200"
                onSubmit={handleComment}
            >
               
                <textarea
                    value={text}
                    placeholder="댓글을 입력하세요"
                    className="
                    p-2
                    min-h-16
                    bg-white"
                    onChange={(e) => { setText(e.target.value) }}
                />
                 <div
                    className="
                    flex
                    justify-end"
                >
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        댓글 작성
                    </button>
                </div>
            </form>
        ) : (
            <form
                className="
                flex flex-col
                mt-3 p-3 gap-3
                 rounded-[6px]
                 bg-gray-200"
            >
                <div
                    className="
                    flex
                    justify-between"
                >
                </div>
                <textarea
                    value={text}
                    placeholder="로그인 후 댓글을 작성할 수 있습니다."
                    className="
                    p-2
                    min-h-16
                    bg-white"
                    disabled={true}
                />
                <div
                    className="flex justify-end">
                    <button
                    type="button"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={handleNavigateToLogin}> 로그인 </button>
                </div>

            </form>
        )
    )


}

//   <form
//                 className="
//                 flex flex-col
//                 mt-3 p-3 gap-3
//                  rounded-[6px]
//                  bg-gray-200"
//                 onSubmit={handleComment}
//             >
//                 <div
//                     className="
//                     flex
//                     justify-between"
//                 >
//                     <input
//                         type="text"
//                         value={author}
//                         placeholder="작성자"
//                         className="
//                     px-2
//                     w-40
//                     bg-white"
//                         onChange={(e) => { setAuthor(e.target.value) }}

//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
//                     >
//                         댓글 작성
//                     </button>
//                 </div>
//                 <textarea
//                     value={text}
//                     placeholder="댓글을 입력하세요"
//                     className="
//                     p-2
//                     min-h-16
//                     bg-white"
//                     onChange={(e) => { setText(e.target.value) }}
//                 />
//             </form>