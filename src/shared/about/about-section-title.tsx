'use client'

import GradualSpacing from '@/lib/ui/gradual-spacing'
import { useEffect, useRef, useState, type FC } from 'react'

interface Props {
    title: string
}

export const AboutSectionTitle: FC<Props> = ({ title }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        )
        const currentRef = observerRef.current

        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.disconnect()
            }
        }
    }, [])

    return (
        <div
            className='w-fit'
            ref={observerRef}>
            {isVisible && (
                <GradualSpacing
                    className='font-bold text-4xl'
                    text={title}
                />
            )}
        </div>
    )
}
