'use client'

import { useSession, UseSessionOptions } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { routePaths } from '../route'
import { useToast } from '@/shared/ui/use-toast'
import { useEffect, useCallback } from 'react'

export const useAdminAuth = (options: UseSessionOptions<boolean> = { required: true }) => {
    const router = useRouter()
    const { toast } = useToast()
    const { data, status } = useSession({
        ...options,
        onUnauthenticated: () => {
            router.push(routePaths.home())
        },
    })

    const isAdminAuthed = status === 'authenticated' && data?.user?.isAdmin === true && data.expires

    const showToast = useCallback(() => {
        toast({
            title: '접근 권한이 없습니다.',
            description: '관리자 권한이 필요합니다.',
            variant: 'secondary',
            className:
                'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-8 sm:top-8 sm:flex-col md:max-w-[220px]',

            duration: 3000,
        })
    }, [toast])

    useEffect(() => {
        if (!isAdminAuthed) {
            showToast()
        }
    }, [isAdminAuthed, showToast])

    return { isAdminAuthed }
}
