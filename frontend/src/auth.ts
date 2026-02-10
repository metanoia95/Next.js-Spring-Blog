import NextAuth,{ type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import { serverGoogleLogin } from "./services/auth/auth.server"
import { decodeJwt } from "jose";


// TS 처리
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      name:string; 
      // image:string;
      role:string;
      image:string;
      email:string;
    } & DefaultSession["user"]
  }

    interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
  
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user, account, profile}) {
      //token은 authjs.session-token 쿠키

      if (user) { // User is available during sign-in
        token.id = user.id
        
      }

      if(account?.provider === "google"){
        
        const body = {
          sub: profile?.sub ?? "",
          email: profile?.email ?? "",
          name: profile?.given_name ?? ""
        }
        
        const res = await serverGoogleLogin(body)
        
        // 토큰 객체에 액세스 토큰을 담아서 줌.
        token.accessToken = res.accessToken
        token.refreshToken = res.refreshToken

      }

      // 액세스 토큰 파싱 => 권한값 추가
      if(!token.role && token.accessToken){
        const payload = decodeJwt(token.accessToken as string)
        token.role = payload.role
        token.id = payload.sub
        console.log("payload: ",payload)
      }

      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string //sub값을 세션 id로 사용
      session.user.role = token.role as string; //role값.
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;


      return session
    },


  },
})