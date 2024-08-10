import { ERROR_CODES } from '@/lib/api'
import { Admin } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider, { CredentialInput } from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'
import * as bcrypt from 'bcrypt'
import prisma from '@/prisma/prisma-client'
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
            } as Record<keyof Admin, CredentialInput>,

            authorize: async (credentials): Promise<any> => {
                const id = credentials?.id
                const password = credentials?.password

                if (!id || !password) {
                    return NextResponse.json({ error: ERROR_CODES.MISSING_ID_OR_PASSWORD }, { status: 400 })
                }

                console.log('prisma.admin', prisma.admin)
                const admin = await prisma.admin.findUnique({
                    where: { id },
                })

                if (!admin) {
                    return NextResponse.json({ error: ERROR_CODES.USER_NOT_FOUND }, { status: 401 })
                }

                const isPasswordMatch = bcrypt.compareSync(password, admin.password)

                if (!isPasswordMatch) {
                    return NextResponse.json({ error: ERROR_CODES.INCORRECT_PASSWORD }, { status: 401 })
                }

                console.log('success!')

                return { name: admin.name }
            },
        }),
    ],

    debug: true,
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 6, // 6 hours
    },
    secret: process.env.JWT_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
