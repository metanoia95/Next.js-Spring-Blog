'use client'



import { useState } from "react"
import PostCommentEditor from "./PostCommentEditor";
import PostComment from "./PostComment";
import { getPostCommentsAxios } from "@/lib/services/blogService";

type CommentType = {
  id: number;
  author: string;
  text: string;
  created_at: string;
};


export default function CommentSection({id, initialComments}:{
    id:number
    initialComments:CommentType[]
}){

    const [comments, setComments] = useState(initialComments)

    const refreshComments = async () => {
        const res = await getPostCommentsAxios(id);
        const data = await res.data;
        console.log("댓글 데이터:", data);
        setComments(data);
    }


    return(
        <>
        <PostCommentEditor postId={id} onCommentSubmit={refreshComments}/>
        <div>
        {comments.map((comment : CommentType)=> {
          return(
           <PostComment 
           key={comment.id} 
           id={comment.id} 
           author={comment.author} 
           comment={comment.text} 
           created_at = {comment.created_at}
            onDelete={refreshComments}
           />
          )
        })

        }
      </div>
        </>

    )

}