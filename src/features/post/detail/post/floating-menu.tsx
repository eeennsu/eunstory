'use client'

import { useEffect, useState } from 'react'
import { useProgressBar } from '@/lib/hooks'
import { ArrowLeft, ArrowUp } from 'lucide-react'
import type { FC } from 'react'
import { MenuButton } from '@/shared/post/detail'

interface Props {
    hasBackButton?: boolean
    scrollThreshold?: number
}

export const FloatingMenu: FC<Props> = ({ hasBackButton = true, scrollThreshold = 200 }) => {
    const { barRouter } = useProgressBar()
    const [showScrollTop, setShowScrollTop] = useState<boolean>(false)

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > scrollThreshold)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className='fixed bottom-10 right-10 z-[20] flex flex-col gap-4'>
            <MenuButton
                onClick={handleScrollToTop}
                disabled={!showScrollTop}>
                <ArrowUp size={28} />
            </MenuButton>

            {hasBackButton && (
                <MenuButton onClick={barRouter.back}>
                    <ArrowLeft size={28} />
                </MenuButton>
            )}
        </nav>
    )
}
