'use client'

import { deleteComment } from "@/lib/services/blogService";


export default function CommentDeleteButton({CommentId, onDelete}:{
    
    CommentId:number
    onDelete : ()=> void;
}){

    const handleDelete = async () => {
        
        try {
            await deleteComment(CommentId)
            
            onDelete();

        } catch(err:unknown){
            console.log(err)

        }
        

    }


    return <button 
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        onClick={handleDelete}
    > 삭제하기 </button>


}