'use client'

import { deletePost } from "@/lib/services/blog/blogService";
import { useRouter } from "next/navigation"

export default function PostDeleteButton({postId}:{postId:number}){

    const router = useRouter();

    const handleDelete = async () => {
        
        try {
            const res = await deletePost(postId)
            

            if (res.status === 200) {
                router.push("/blog");
              }


        } catch(err:unknown){
            console.log(err)

        }
        

    }


    return <button 
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
        onClick={handleDelete}
    > 삭제하기 </button>


}