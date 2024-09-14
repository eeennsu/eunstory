import { ERROR_CODES } from '@/lib/fetch'
import { User } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import CredentialsProvider, { CredentialInput } from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '@/lib/prisma/prisma-client'
import { assertValue } from '@/lib//utils'

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

                const admin = await prisma.user.findFirst({
                    where: { username: id },
                })

                if (!admin || !admin?.password) {
                    throw new Error(ERROR_CODES.USER_NOT_FOUND.code)
                }

                const isPasswordMatch = bcrypt.compareSync(password, admin.password)

                if (!isPasswordMatch) {
                    throw new Error(ERROR_CODES.INCORRECT_ID_OR_PASSWORD.code)
                }

                return { '@id': admin.id, name: admin.name, isAdmin: admin.isAdmin }
            },
        }),
        GitHubProvider({
            clientId: assertValue(process.env.GITHUB_CLIENT_ID),
            clientSecret: assertValue(process.env.GITHUB_CLIENT_SECRET),
            authorization: {
                params: {
                    scope: 'read:user user:email',
                },
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 6, // 6 hours
    },

    secret: assertValue(process.env.JWT_SECRET),

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.isAdmin = user.isAdmin
                token['@id'] = user['@id']
            }

            return Promise.resolve(token)
        },
        session: async ({ session, token }) => {
            session.user.isAdmin = token.isAdmin as boolean | undefined
            session.user['@id'] = token['@id'] as string | undefined

            return Promise.resolve(session)
        },
        // redirect: async ({ url, baseUrl }) => {
        //     const redirectUrl = url.startsWith('/') ? new URL(url, baseUrl).toString() : url
        //     return redirectUrl
        // },
    },
}
