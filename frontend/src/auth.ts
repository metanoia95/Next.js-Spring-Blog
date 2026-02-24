import NextAuth, { Account, Profile, type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import { refreshAccessTokenSSR, serverGoogleLogin } from "./services/auth/auth.server"
import { decodeJwt } from "jose";
import { JWT } from "@auth/core/jwt";


// TS 처리
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      name: string;
      // image:string;
      role: string;
      image: string;
      email: string;
    } & DefaultSession["user"]
  }

  interface JWT {
    accessToken?: string;
    accessTokenExpires: number;
    refreshToken?: string;

  }

}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      //token은 authjs.session-token 쿠키


      if (account) {
        token.id = user.id
        return await handleInitialLogin(token, account, profile)

      }
      else if (Date.now() < (token.accessTokenExpires as number)) { // utc로 비교
        return token

      } else {
        //console.log("refreshAcToken")
        //console.log(token.refreshToken)
        if(!token.refreshToken) throw new TypeError("Missing refresh_token")

        try {

          const res = await refreshAccessTokenSSR(token.refreshToken as string)
          
          token.accessToken= res.accessToken 
          return applyAccessTokenToJWT(token)


        } catch (error:unknown) {
          if(error instanceof ReferenceError ){
            

            
          }
        }

      }



      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string //sub값을 세션 id로 사용
      session.user.role = token.role as string; //role값.
      session.accessToken = token.accessToken as string;

      return session
    },


  },
})

const handleInitialLogin = async (token: JWT, account: Account, profile: Profile | undefined) => {

  if (account?.provider === "google") {

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

  return applyAccessTokenToJWT(token)

}

const applyAccessTokenToJWT =  (token:JWT) => {
  
  // 액세스 토큰 파싱 => 권한값 추가
  const payload = decodeJwt(token.accessToken as string)
  token.role = payload.role
  token.id = payload.sub
  token.accessTokenExpires = (payload.exp as number) * 1000 // 시간값 보정. Date.now()함수는 13자리, exp 값은 10자리. 

  return token
}