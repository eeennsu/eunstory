import { DefaultSession, DefaultUser } from 'next-auth'
import NextAuth from 'next-auth/next'

declare module 'next-auth' {
    interface User extends DefaultUser {
        isAdmin?: boolean
        '@id'?: string
    }

    interface Session {
        user: DefaultUser & { isAdmin?: boolean; '@id'?: string }
    }
}
