import { signIn } from "@/auth"


export default function GoogleSignIn() {

    return (
        <form
            action={async () => {
                "use server"
                //POST /api/auth/signin/google 요청 생성  => /app/api/auth/[...nextauth]/route.ts 로 요청이 감.
                // [...nextauth] : /api/auth/* 캐치
                await signIn("google", {redirectTo: "/"})
                // 최종적으로 백엔드 인증을 위해 /api/bff/auth/login을 호출.
                
                //콜백 경로
                //http://localhost:3000/api/auth/callback/google *이것도 /app/api/auth/[...nextauth]/route.ts 로 리턴이 들어옴.
                
            }}
        >
            <button type="submit">구글 로그인</button>
        </form>

    )

}