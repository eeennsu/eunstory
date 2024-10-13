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

        const currentTarget = targetRef.current
        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect()
            }
        }, options)

        if (currentTarget) {
            observerRef.current.observe(currentTarget)
        }

        return () => {
            if (currentTarget && observerRef.current) {
                observerRef.current.unobserve(currentTarget)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore])

    return { targetRef }
}
