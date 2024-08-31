'use client'

import { useSession, UseSessionOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { routePaths } from '@/lib/route'
import { useToast } from '@/lib/ui/use-toast'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { errorMessages } from '@/lib/toast'

type Params = {
    isProtectedRoute?: boolean
    options?: UseSessionOptions<boolean>
}

export const useAdminAuth = ({ isProtectedRoute = false, options = { required: true } }: Params = {}) => {
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
                            title: errorMessages.FORBIDDEN.title,
                            description: errorMessages.FORBIDDEN.description,
                        }),
                    500
                )
            }
        },
    })

    const isAdminAuthed = status === 'authenticated' && session?.user?.isAdmin === true && session.expires
    const adminId = session?.user['@id'] || undefined

    return { isAdminAuthed, adminId }
}
