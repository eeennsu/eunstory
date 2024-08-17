import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const getServerAuth = async () => {
    const session = await getServerSession(authOptions)

    const isAdminAuthed = session?.user.isAdmin && session.user['@id']

    return { isAdminAuthed }
}
