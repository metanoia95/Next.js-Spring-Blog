'use client'
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/date";
import { useSession } from "next-auth/react";
import { deleteComment } from "@/services/blog/blogService";

interface PostCommentProps {
    id: string;
    authorId: string;
    comment: string
    created_at: string

}

export default function PostComment({
    id,
    authorId,
    comment,
    created_at,

}: PostCommentProps) {
    const [isAuthor, setIsAuthor] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            if (session?.user.id === authorId
                 || session?.user.role == "ADMIN"
            ) {
                setIsAuthor(true);
            } else {
                setIsAuthor(false);
            }
        }
    }, [session, authorId])


    const handleDelete = async () => {
        try {
            await deleteComment(id);
        } catch (err: unknown) {
            console.log(err);
        }
    };



    return (
        <div key={id}
            className="p-2 border-b border-gray-300">
            {/* 댓글창 헤더 */}
            <div className="flex flex-row justify-start mb-2">
                <div className="mb-3">{authorId} </div>
                <span className="ml-2 text-gray-500">{formatDate(created_at)}</span>
            </div>
            <div className="flex flex-row justify-between"  >
                <div>{comment}</div>
                {isAuthor &&
                    <button
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                }
            </div>


        </div>
    )
}