'use client'

import { useSession, UseSessionOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { routePaths } from '@/lib/route'
import { useToast } from '@/lib/ui/use-toast'
import { ERROR_CODES } from '@/lib/fetch'

type Params = {
    isProtectedRoute?: boolean
    options?: UseSessionOptions<boolean>
}

export const useAdminSession = ({ isProtectedRoute = false, options = { required: true } }: Params = {}) => {
    const router = useRouter()
    const { toast } = useToast()
    const { data: session, status } = useSession({
        ...options,
        onUnauthenticated: () => {
            if (isProtectedRoute) {
                router.replace(routePaths.home())
                setTimeout(
                    () =>
                        toast({
                            title: ERROR_CODES.FORBIDDEN.title,
                            description: ERROR_CODES.FORBIDDEN.description,
                        }),
                    500
                )
            }
        },
    })

    const isAdminAuthed = status === 'authenticated' && session?.user?.isAdmin === true && session.expires
    const adminId = (!!session?.user['@id'] && session?.user?.isAdmin === true ) && session.user['@id'] || undefined

    return { isAdminAuthed, adminId, status }
}
