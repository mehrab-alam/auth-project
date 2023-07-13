import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react"
const prisma = new PrismaClient();
export const authOptions = {
    secret: process.env.NEXT_PUBLIC_SECRET,
    adapter: PrismaAdapter(prisma),

    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: "799867194815-415l8muo29a27e2els66gnbgr0e4pbpv.apps.googleusercontent.com",
            clientSecret: "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",
        }),
        // ...add more providers here
    ],
    session: {
        strategy: "jwt"
    },
    callBack: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user)
            return true
        },
        async jwt(info) {
            console.log(info)
            return info.token
        }
    },
    pages: {
        signIn: "/login"
    },
}
export default NextAuth(authOptions)