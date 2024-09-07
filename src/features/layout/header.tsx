'use client'

import { routePaths } from '@/lib/route'
import { NAV_LINKS } from '@/shared/constants'
import { Button } from '@/lib/ui/button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, type FC } from 'react'
import { LoginModal } from '@/features/layout'
import { useAdminAuth } from '@/lib/hooks'

export const Header: FC = () => {
    const { isAdminAuthed } = useAdminAuth()
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        if (count === 0 || count === 3) return

        const timer = setTimeout(() => {
            setCount(0)
        }, 500)

        return () => clearTimeout(timer)
    }, [count])

    return (
        <header className='bg-sky-200 w-full flex items-center justify-center'>
            <section className='relative flex w-full max-w-[900px] justify-between items-center'>
                <Link href={isAdminAuthed ? routePaths.admin() : routePaths.home()}>
                    <Image
                        src={'/images/eunstory-logo.png'}
                        width={200}
                        height={100}
                        alt='EunStory Logo'
                    />
                </Link>
                <LoginModal
                    isTriggered={count === 3}
                    close={() => setCount(0)}>
                    <div
                        className='absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2 w-40 h-14 '
                        onClick={() => setCount((prev) => prev + 1)}
                    />
                </LoginModal>
                <nav className='flex gap-4 py-4 justify-center'>
                    {NAV_LINKS.map((link) => (
                        <Button
                            key={link.title}
                            variant='secondary'
                            asChild>
                            <Link href={link.url}>{link.title}</Link>
                        </Button>
                    ))}
                    {isAdminAuthed && (
                        <>
                            <Button
                                asChild
                                variant='secondary'>
                                <Link href={routePaths.admin()}>Admin</Link>
                            </Button>
                            <Button onClick={() => signOut()}>Logout</Button>
                        </>
                    )}
                </nav>
            </section>
        </header>
    )
}
