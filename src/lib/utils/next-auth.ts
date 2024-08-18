import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const getServerAuth = async () => {
    const session = await getServerSession(authOptions)

    const isAdminAuthed = session?.user.isAdmin && session.user['@id']

    return { isAdminAuthed }
}
