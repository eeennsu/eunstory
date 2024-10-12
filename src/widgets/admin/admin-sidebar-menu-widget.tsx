import { adminPath } from '@/lib/route'
import { SideMenuButton } from '@/shared/admin'
import type { FC } from 'react'

export const AdminSidebarMenuWidget: FC = () => {
    return (
        <nav className='fixed top-1/4 bg-gray-800 rounded-xl shadow-2xl flex flex-col justify-center items-center gap-6 p-4'>
            <SideMenuButton
                href={adminPath.users()}
                text='User Accounts'
            />
            <SideMenuButton
                href={adminPath.comments()}
                text='Comments'
            />
        </nav>
    )
}
