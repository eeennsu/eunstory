import { DefaultSession, DefaultUser } from 'next-auth'
import NextAuth from 'next-auth/next'

type CustomUserProps = {
    isAdmin?: boolean
    '@id'?: string
    url?: string
    provider?: string
}

declare module 'next-auth' {
    interface User extends DefaultUser, CustomUserProps {}

    interface Session {
        user: DefaultUser & CustomUserProps
    }

    interface Profile {
        html_url: string
    }

    interface AdapterUser extends DefaultUser {
        provider: string
    }

    interface JWT extends Partial<Pick<CustomUserProps, '@id' | 'isAdmin'>> {
        name?: string
        email?: string
        picture?: string
        sub?: string
        url?: string
        iat: number
        exp: number
        jtl: number
    }
}
