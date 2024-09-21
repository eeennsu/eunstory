'use client'

import { routePaths } from '@/lib/route'
import { NAV_LINKS } from '@/shared/constants'
import { Button } from '@/lib/ui/button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import { LoginModal } from '@/features/layout'
import { useAdminSession } from '@/lib/hooks'

export const Header: FC = () => {
    const { isAdminAuthorized, status } = useAdminSession({ options: { required: false } })

    return (
        <header className='bg-sky-200 w-full flex items-center justify-center'>
            <section className='relative flex w-full max-w-[900px] justify-between items-center'>
                <Link href={isAdminAuthorized ? routePaths.admin() : routePaths.home()}>
                    <Image
                        src={'/images/eunstory-logo.png'}
                        width={200}
                        height={100}
                        alt='EunStory Logo'
                    />
                </Link>

                <nav className='flex gap-4 py-4 justify-center'>
                    {NAV_LINKS.map((link) => (
                        <Button
                            key={link.title}
                            variant='secondary'
                            asChild>
                            <Link href={link.url}>{link.title}</Link>
                        </Button>
                    ))}
                    {status === 'authenticated' && <Button onClick={() => signOut()}>Logout</Button>}
                    {status === 'unauthenticated' && <LoginModal />}
                    {isAdminAuthorized && (
                        <Button
                            asChild
                            variant='secondary'>
                            <Link href={routePaths.admin()}>Admin</Link>
                        </Button>
                    )}
                </nav>
            </section>
        </header>
    )
}
