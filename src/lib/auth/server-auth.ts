'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const getServerAuth = async () => {
    const session = await getServerSession(authOptions)

    const isAuthenticated = Boolean(session?.user && session?.user?.['@id'])
    const isAdminAuthorized = Boolean(session?.user?.isAdmin && session.user['@id'])

    return { user: session?.user, isAuthenticated, isAdminAuthorized }
}
