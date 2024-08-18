import { useEffect, useRef, useState } from 'react'

interface InfiniteScrollProps {
    onIntersect: () => void
    options?: IntersectionObserverInit
    hasMore: boolean
}

export const useInfiniteScroll = ({
    onIntersect,
    options = { threshold: 0.2, rootMargin: '0px' },
    hasMore,
}: InfiniteScrollProps) => {
    const targetRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const isInitialLoad = useRef<boolean>(true) // 초기 로드 상태 관리

    useEffect(() => {
        if (!hasMore) return

        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (isInitialLoad.current) {
                    isInitialLoad.current = false
                } else {
                    onIntersect()
                }
            }
        }, options)

        if (targetRef.current) {
            observerRef.current.observe(targetRef.current)
        }

        return () => {
            if (targetRef.current && observerRef.current) {
                observerRef.current.unobserve(targetRef.current)
            }
        }
    }, [hasMore])

    return { targetRef }
}
