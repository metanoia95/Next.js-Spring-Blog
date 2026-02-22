import { formatDate } from "@/lib/utils/date";
import Link from "next/link";


export default function PostCard({ post }: { post: { id: number; title: string; created_at: string } }) {
    
    return (
        <Link href={`/blog/${post.id}`} className="block">
            <div className="
                      mt-4 p-6 rounded-xl
                      border border-gray-200
                      transition
                      hover:-translate-y-1
                      hover:shadow-lg
                    ">
                <h2 className="text-xl font-semibold mb-2">
                    {post.title}
                </h2>
                <time className="text-sm text-gray-400">
                    {formatDate(post.created_at)}
                </time>
            </div>
        </Link>


    )

}