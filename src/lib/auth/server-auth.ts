'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const getServerAdminAuth = async () => {
    const session = await getServerSession(authOptions)

    const isAdminAuthed = Boolean(session?.user.isAdmin && session.user['@id'])

    return { isAdminAuthed }
}
