import { useEffect, useRef } from 'react'

interface InfiniteScrollProps {
    onIntersect: () => void
    options?: IntersectionObserverInit
    hasMore: boolean
}

export const useInfiniteScroll = ({
    onIntersect,
    options = { threshold: 0.1, rootMargin: '10px' },
    hasMore,
}: InfiniteScrollProps) => {
    const targetRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        if (!hasMore) return

        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect()
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
