import CommentDeleteButton from "./CommentDelBtn";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/date";
import { useSession } from "next-auth/react";

interface PostCommentProps {
    id: number;
    authorId: string;
    comment: string
    created_at: string
    onDelete: (id: number) => void;
}

export default function PostComment({
    id,
    authorId,
    comment,
    created_at,
    onDelete
}: PostCommentProps) {
    const [isAuthor, setIsAuthor] = useState(false);
    const {data : session} = useSession();

    useEffect(() => {
        if (session?.user) {
            if (session?.user.id == authorId 
            //    || session?.user.role == "ADMIN"
            ) {
                setIsAuthor(true);
            } else {
                setIsAuthor(false);
            }
        }
    }, [session, authorId])

    return (
        <div key={id}
            className="p-2 border-b border-gray-300">
            {/* 댓글창 헤더 */}
            <div className="flex flex-row justify-start mb-2">
                <div className="mb-3">{authorId} </div>
                <span className="ml-2 text-gray-500">{formatDate(created_at)}</span>
            </div>
            <div  className="flex flex-row justify-between"  >
                <div>{comment}</div>
                {isAuthor &&
                    <CommentDeleteButton CommentId={id} onDelete={() => onDelete(id)} />
                }
            </div>


        </div>
    )
}