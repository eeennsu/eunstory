'use client'

import { useEffect } from 'react'
import { useSession, UseSessionOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { routePaths } from '@/lib/route'
import { cn } from '@/lib/shadcn'
import { useToast } from '@/shared/ui/use-toast'

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
                            title: '접근 권한이 없습니다.',
                            description: '관리자 권한이 필요합니다.',
                            variant: 'secondary',
                            className: cn(
                                'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-8 sm:top-8 sm:flex-col md:max-w-[220px]'
                            ),
                            duration: 3000,
                        }),
                    100
                )
            }
        },
    })

    const isAdminAuthed = status === 'authenticated' && session?.user?.isAdmin === true && session.expires

    return { isAdminAuthed }
}
