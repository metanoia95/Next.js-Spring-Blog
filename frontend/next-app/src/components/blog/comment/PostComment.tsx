import { useUser } from "@/lib/hooks/useUser";
import CommentDeleteButton from "./CommentDelBtn";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils/date";

interface PostCommentProps {
    id: number;
    authorId: number;
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
    debugger;
    const { data, isLoading, isError } = useUser(); // 사용자 정보 훅
    const [isAuthor, setIsAuthor] = useState(false);
    
    useEffect(() => {
        if (!isLoading && data) {
            if (data.id == authorId) {
                setIsAuthor(true);
            } else {
                setIsAuthor(false);
            }
        }

    }, [data, isLoading])

    return (
        <div key={id}
            className="p-2 border-b border-gray-300"
        >
            {/* 댓글창 헤더 */}
            <div className="flex flex-row justify-start mb-2">
                <div
                    className="mb-3"
                >{authorId}
                </div>
                <span className="ml-2 text-gray-500">{formatDate(created_at)}</span>
            </div>

            <div
                className="flex flex-row justify-between"
            >
                <div>{comment}</div>
                {isAuthor &&
                    <CommentDeleteButton CommentId={id} onDelete={() => onDelete(id)} />
                }
            </div>


        </div>
    )
}