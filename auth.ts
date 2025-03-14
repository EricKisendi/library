import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
  providers: [CredentialProvider(config: {})],
})