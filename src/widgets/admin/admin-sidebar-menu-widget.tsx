import { mainPath } from '@/lib/route'
import { SideMenuButton } from '@/shared/admin'
import type { FC } from 'react'

export const AdminSidebarMenuWidget: FC = () => {
    return (
        <nav className='fixed top-1/4 bg-gray-800 rounded-xl shadow-2xl flex flex-col justify-center items-center gap-6 p-4'>
            <SideMenuButton
                href={mainPath.home()}
                text='Home'
                isMainLink
            />
            <SideMenuButton
                href={mainPath.about()}
                text='About'
                isMainLink
            />
            <SideMenuButton
                href={mainPath.post.list()}
                text='Posts'
                isMainLink
            />
            <SideMenuButton
                href='#admin-dashboard-users'
                text='User Accounts'
            />
            <SideMenuButton
                href='#admin-dashboard-comments'
                text='Comments'
            />
        </nav>
    )
}
