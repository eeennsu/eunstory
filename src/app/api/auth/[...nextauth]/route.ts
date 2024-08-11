import { ERROR_CODES } from '@/lib/api'
import { User } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider, { CredentialInput } from 'next-auth/providers/credentials'
import * as bcrypt from 'bcrypt'
import prisma from '@/lib/prisma/prisma-client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const authOptions: AuthOptions = {
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
                    throw new Error(ERROR_CODES.MISSING_ID_OR_PASSWORD)
                }

                const admin = await prisma.user.findFirst({
                    where: { username: id },
                })

                if (!admin) {
                    throw new Error(ERROR_CODES.USER_NOT_FOUND)
                }

                const isPasswordMatch = bcrypt.compareSync(password, admin.password)

                if (!isPasswordMatch) {
                    throw new Error(ERROR_CODES.INCORRECT_PASSWORD)
                }

                return { '@id': admin.id, name: admin.name, isAdmin: admin.isAdmin }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 6, // 6 hours
    },

    secret: process.env.JWT_SECRET,

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.isAdmin = user.isAdmin
                token['@id'] = user['@id']
            }

            return token
        },
        session: async ({ session, token }) => {
            session.user.isAdmin = token.isAdmin as boolean | undefined
            session.user['@id'] = token['@id'] as string | undefined

            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
