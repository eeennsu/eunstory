'use client'

import { adminPath, mainPath } from '@/lib/route'
import { NAV_LINKS } from '@/shared/constants'
import { Button } from '@/lib/ui/button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import { LoginModal } from '@/features/layout'
import { useAdminSession } from '@/lib/hooks'
import WordFadeIn from '@/lib/ui/word-fade-in'

export const Header: FC = () => {
    const { isAdminAuthorized, status } = useAdminSession({ options: { required: false } })

    return (
        <header className='bg-slate-700/50 backdrop-blur-lg w-full py-2 flex items-center justify-center border-b fixed top-0 z-10'>
            <section className='relative flex w-full max-w-5xl justify-between items-center'>
                <Link
                    href={isAdminAuthorized ? adminPath.admin() : mainPath.home()}
                    className='flex items-center'>
                    <Image
                        src={'/images/eunstory-logo.png'}
                        width={90}
                        height={90}
                        alt='EunStory Logo'
                        className='bg-transparent'
                    />

                    <WordFadeIn
                        words='Eunstory'
                        className='md:text-2xl text-slate-200'
                        delay={0.5}
                    />
                </Link>

                <nav className='flex gap-9 py-4 justify-center items-center'>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.title}
                            href={link.url}
                            className='transition-colors hover:text-foreground text-foreground/60'>
                            {link.title}
                        </Link>
                    ))}
                    {status === 'authenticated' && <Button onClick={() => signOut()}>SignOut</Button>}
                    {status === 'unauthenticated' && (
                        <LoginModal>
                            <Button
                                variant='outline'
                                size='sm'
                                className='px-4 py-2 h-9 bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'>
                                Sign In
                            </Button>
                        </LoginModal>
                    )}
                    {isAdminAuthorized && (
                        <Button
                            asChild
                            variant='secondary'>
                            <Link href={adminPath.admin()}>Admin</Link>
                        </Button>
                    )}
                </nav>
            </section>
        </header>
    )
}
