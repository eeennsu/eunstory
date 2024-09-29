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
import { LogOut } from 'lucide-react'

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
                    {status === 'authenticated' && (
                        <Button
                            onClick={() => signOut()}
                            className='bg-gray-900/60 text-gray-200 hover:bg-gray-900/90 gap-2.5 hover:text-white border border-gray-400/20'>
                            <LogOut size={16} />
                            Sign Out
                        </Button>
                    )}
                    {status === 'unauthenticated' && (
                        <LoginModal>
                            <Button
                                variant='outline'
                                className='bg-slate-600 hover:bg-slate-700 border-none '>
                                Sign In
                            </Button>
                        </LoginModal>
                    )}
                </nav>
            </section>
        </header>
    )
}
