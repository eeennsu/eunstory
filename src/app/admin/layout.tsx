import { AdminSidebarMenuWidget } from '@/widgets/admin'
import type { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='flex w-full flex-grow pt-[90px]'>
            <aside className='w-56 flex justify-center'>
                <AdminSidebarMenuWidget />
            </aside>
            <div className='flex-grow mr-56'>{children}</div>
        </div>
    )
}

export default Layout
