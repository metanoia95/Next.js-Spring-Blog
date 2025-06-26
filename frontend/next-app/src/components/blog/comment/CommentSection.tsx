'use client'



import { useState } from "react"
import PostCommentEditor from "./PostCommentEditor";
import PostComment from "./PostComment";

type CommentType = {
  id: number;
  author: string;
  text: string;
  created_at: string;
};


export default function CommentSection({postId, initialComments}:{
    postId:number
    initialComments:CommentType[]
}){

    const [comments, setComments] = useState(initialComments)

    const refreshComments = async () => {
        const res = await fetch(`http://localhost:8089/api/blog/comments/${postId}`, { cache: 'no-store' });
        const data = await res.json();
        setComments(data);
    }


    return(
        <>
        <PostCommentEditor postId={postId} onCommentSubmit={refreshComments}/>
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