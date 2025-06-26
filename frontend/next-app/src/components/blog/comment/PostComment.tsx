import CommentDeleteButton from "./CommentDelBtn";

interface PostCommentProps {
    id:number;
    author : string
    comment : string
    created_at : string
    onDelete : (id:number)=> void;
}

export default function PostComment({
    id,
    author,
    comment,
    created_at,
    onDelete
}:PostCommentProps){
 return(
        <div key={id}
            className="p-5 border-b border-gray-300"
        >
            <div 
                className="mb-3"
            >{author}</div>
            <div 
                className="flex flex-row justify-between"
            >
                <div>{comment}</div>
            <div>{created_at}</div>
            <CommentDeleteButton CommentId={id} onDelete={()=>onDelete(id)}/>
            </div>
            
        </div>
    )
}