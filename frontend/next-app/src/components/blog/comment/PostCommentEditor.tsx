'use client'

import { SaveComment, SaveCommentReq } from "@/lib/services/blogService"
import { useEffect, useState } from "react"

export default function PostCommentEditor({
    postId, 
    onCommentSubmit
}:{postId: number,
    onCommentSubmit: ()=>void
}){

    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")


    useEffect(()=>{
        
        
        
    },[])


    // 댓글 저장 핸들러
    const handleComment = async(e:React.FormEvent)=> {
        e.preventDefault();

        try{

            const dto : SaveCommentReq = {
                post_id : postId,
                author :author,
                text : text
            }
            //console.log(dto)

            await SaveComment(dto);
            setAuthor("")
            setText("")
            onCommentSubmit(); // 댓글 목록 갱신

        }catch(err:unknown){
            console.log(err)
        }

    }


    return(
        <form
            className="
            flex flex-col
            mt-3 p-3 gap-3
             rounded-[6px]
             bg-gray-200"
            onSubmit={handleComment}
        >
            <div
                className="
                flex
                justify-between"
            >
                <input 
                type="text"
                value={author}
                placeholder="작성자"
                className="
                px-2
                w-40
                bg-white"
                onChange={(e)=>{setAuthor(e.target.value)}}

            />
            <button 
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
                댓글 작성
            </button>
            </div>
            
            <textarea
                value={text}
                placeholder="댓글을 입력하세요"
                className="
                p-2
                min-h-16
                bg-white"
                onChange={(e)=>{setText(e.target.value)}}
            />
        </form>
    )


}