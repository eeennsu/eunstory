import { ERROR_CODES } from '@/lib/fetch'
import { User } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import CredentialsProvider, { CredentialInput } from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../prisma/prisma-client'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'admin-auth',

            credentials: {
                id: { label: 'ID', type: 'text' },
                password: { label: 'Password', type: 'password' },
                name: { label: 'Name', type: 'text' },
                isAdmin: { label: 'Is Admin', type: 'checkbox' },
            } as Record<keyof User, CredentialInput>,

            authorize: async (credentials): Promise<any> => {
                const id = credentials?.id
                const password = credentials?.password

                if (!id || !password) {
                    throw new Error(ERROR_CODES.MISSING_ID_OR_PASSWORD.code)
                }

                let admin: User | null = null

                try {
                    admin = await prisma.user.findFirst({
                        where: { username: id },
                    })
                } catch (error) {
                    return Promise.reject(new Error(ERROR_CODES.USER_NOT_FOUND.code))
                }

                if (!admin || !admin?.password) {
                    throw new Error(ERROR_CODES.USER_NOT_FOUND.code)
                }

                const isPasswordMatch = await bcrypt.compare(password, admin.password)

                if (!isPasswordMatch) {
                    throw new Error(ERROR_CODES.INCORRECT_ID_OR_PASSWORD.code)
                }

                return { '@id': admin.id, name: admin.name, isAdmin: admin.isAdmin }
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'read:user user:email',
                    prompt: 'select_account',
                },
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24, // 24 hours
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        jwt: async ({ token, user, profile }) => {
            if (user) {
                token.isAdmin = user.isAdmin
                token['@id'] = user['@id']
                token['url'] = profile?.html_url || undefined

                if (user.isAdmin === false) {
                    try {
                        const curUser = await prisma.user.findFirst({
                            where: { id: token.sub },
                            select: { url: true },
                        })

                        if (!curUser?.url) {
                            await prisma.user.update({
                                where: { id: token.sub },
                                data: { url: token.url as string },
                            })
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            }

            return Promise.resolve(token)
        },
        session: async ({ session, token }) => {
            session.user.isAdmin = token.isAdmin as boolean | undefined
            session.user['@id'] = (token.isAdmin ? token['@id'] : token.sub) as string | undefined
            session.user.url = token.url as string | undefined

            return Promise.resolve(session)
        },
    },
}
