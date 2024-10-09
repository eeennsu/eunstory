'use client'

import { useSession, UseSessionOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { mainPath } from '@/lib/route'
import { ERROR_CODES } from '@/lib/fetch'
import { useToast } from './use-toast'

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
                router.replace(mainPath.home())
                setTimeout(
                    () =>
                        toast({
                            type: 'warning',
                            title: ERROR_CODES.FORBIDDEN.title,
                        }),
                    500
                )
            }
        },
    })

    const isAdminAuthorized = status === 'authenticated' && session?.user?.isAdmin === true && session.expires
    const adminId = (!!session?.user['@id'] && session?.user?.isAdmin === true && session.user['@id']) || undefined

    return { isAdminAuthorized, adminId, status }
}
