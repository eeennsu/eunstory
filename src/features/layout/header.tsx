'use client'

import { routePaths } from '@/lib/route'
import { NAV_LINKS } from '@/shared/constants'
import { Button } from '@/shared/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import type { FC } from 'react'

export const Header: FC = () => {
    const { data, status } = useSession()

    const isAdminLoggedIn = status === 'authenticated' && data?.user?.isAdmin

    return (
        <header className='bg-sky-200 w-full'>
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
        </header>
    )
}
