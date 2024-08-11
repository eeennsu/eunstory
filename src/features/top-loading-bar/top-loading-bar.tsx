'use client'

import { useFetchLoadingStore } from '@/entities/fetch-loading'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, type FC } from 'react'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

export const TopLoadingBar: FC = () => {
    const loadingBarRef = useRef<LoadingBarRef>(null)
    const isFetchLoading = useFetchLoadingStore((state) => state.isLoading)

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const isMountedRef = useRef<boolean>(false)

    useEffect(() => {
        if (isMountedRef.current === true) {
            if (isFetchLoading) {
                loadingBarRef.current?.continuousStart()
            } else {
                loadingBarRef.current?.complete()
            }
        } else {
            isMountedRef.current = true
        }
    }, [isFetchLoading])

    useEffect(() => {
        if (isMountedRef.current === true) {
            loadingBarRef.current?.continuousStart()
            setTimeout(() => {
                loadingBarRef.current?.complete()
            }, 10)
        } else {
            isMountedRef.current = false
        }
    }, [pathname, searchParams])

    return (
        <LoadingBar
            color='#49a3ed'
            height={6}
            ref={loadingBarRef}
        />
    )
}
