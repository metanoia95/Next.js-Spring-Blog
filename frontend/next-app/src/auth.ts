import NextAuth,{ type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import { serverGoogleLogin } from "./services/auth/auth.server"


// TS 처리
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
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

      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string //sub값을 세션 id로 사용
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;

      return session
    },


  },
})