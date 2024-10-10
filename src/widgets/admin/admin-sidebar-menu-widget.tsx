import { adminPath } from '@/lib/route'
import Link from 'next/link'
import type { FC } from 'react'

export const AdminSidebarMenuWidget: FC = () => {
    return (
        <aside className='fixed top-1/4 left-5 bg-gray-800 rounded-xl shadow-xl flex flex-col justify-center items-center gap-6 py-6 px-4'>
            <Link
                href={adminPath.users()}
                className='text-lg font-semibold text-gray-300 px-6 py-3 rounded-lg w-52 text-center transition-all duration-300 hover:bg-gray-700 hover:text-teal-400 hover:scale-105 shadow-md'>
                User Accounts
            </Link>
            <Link
                href={adminPath.comments()}
                className='text-lg font-semibold text-gray-300 px-6 py-3 rounded-lg w-52 text-center transition-all duration-300 hover:bg-gray-700 hover:text-teal-400 hover:scale-105 shadow-md'>
                Comments
            </Link>
        </aside>
    )
}
