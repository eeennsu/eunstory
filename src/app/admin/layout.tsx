'use client'

import { AdminSidebarMenuWidget } from '@/widgets/admin'
import type { FC, PropsWithChildren } from 'react'
import { mainPath } from '@/lib/route'
import { redirect } from 'next/navigation'
import { useAdminSession } from '@/lib/hooks'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const { isAdminAuthorized, status } = useAdminSession()

    if (status === 'loading') {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 border-opacity-75'></div>
            </div>
        )
    }

    if (!isAdminAuthorized) {
        redirect(mainPath.home())
    }

    return (
        <div className='flex w-full flex-grow pt-5'>
            <aside className='w-56 flex justify-center'>
                <AdminSidebarMenuWidget />
            </aside>
            <div className='flex-grow mr-56'>{children}</div>
        </div>
    )
}

export default Layout
