'use client'

import type { FC, PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { useParams, useRouter, usePathname } from 'next/navigation'
import { adminPath } from '@/lib/route'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith(adminPath.admin())

    return (
        <div className='flex w-full min-h-dvh flex-col items-center justify-center text-foreground'>
            {!isAdmin && <Header />}
            <div className='flex flex-col w-full flex-1 bg-slate-800/85'>{children}</div>
            {!isAdmin && <Footer />}
        </div>
    )
}
