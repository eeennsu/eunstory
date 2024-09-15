import { useSession, UseSessionOptions } from 'next-auth/react'

export const useCustomSession = (options?: UseSessionOptions<boolean>) => {
    const { data: session, status } = useSession(options)

    const isAuthenticated = status === 'authenticated' && session.user['@id']

    return { isAuthenticated, user: session?.user, status }
}
