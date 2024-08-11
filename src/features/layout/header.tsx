'use client'

import { routePaths } from '@/lib/route'
import { NAV_LINKS } from '@/shared/constants'
import { Button } from '@/shared/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, type FC } from 'react'
import { LoginModal } from '@/features/layout'

export const Header: FC = () => {
    const { data, status } = useSession()
    const isAdminLoggedIn = status === 'authenticated' && data?.user?.isAdmin

    const [count, setCount] = useState<number>(0)

    return (
        <header className='bg-sky-200 w-full flex items-center justify-center'>
            <section className='relative flex w-full max-w-[900px] justify-between items-center'>
                <Link href={routePaths.home()}>
                    <Image
                        src={'/images/eunstory-logo.png'}
                        width={200}
                        height={100}
                        alt='EunStory Logo'
                    />
                </Link>
                <LoginModal
                    trigger={
                        <div
                            className='absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2 w-28 h-10'
                            onClick={() => setCount((prev) => prev + 1)}
                        />
                    }
                    isTriggered={count === 3}
                    close={() => setCount(0)}
                />
                <nav className='flex gap-4 py-4 justify-center'>
                    {NAV_LINKS.map((link) => (
                        <Button
                            key={link.title}
                            variant='secondary'
                            asChild>
                            <Link href={link.url}>{link.title}</Link>
                        </Button>
                    ))}
                    {isAdminLoggedIn && (
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
