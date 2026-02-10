import { auth } from "@/auth"
import Image from "next/image"

export default async function UserAvatar() {
    const session = await auth()

    if (!session?.user) return null

    // Image 태그 사용하려면 next.config.ts.에서 규칙 추가해줘야함.

    return (
        <div>
            {session.user.image && (
                <Image src={session.user.image}
                    width={40}
                    height={40}
                    alt="User Avatar" />
                )
            }
        </div>
    )
}