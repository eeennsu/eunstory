import { AdminAccountsWidgetDynamic, AdminCommentsWidgetDynamic } from '@/widgets/admin'
import { LayoutDashboard } from 'lucide-react'

import type { FC } from 'react'

const AdminPage: FC = () => {
    return (
        <main className='page-container pt-24 pb-10 gap-10'>
            <section className='flex gap-2 w-full items-center justify-center'>
                <h1 className='text-3xl font-bold text-gray-200'>Dashboard</h1>
                <LayoutDashboard />
            </section>
            <section className='flex flex-col gap-10'>
                <AdminAccountsWidgetDynamic />
                <AdminCommentsWidgetDynamic />
            </section>
        </main>
    )
}

export default AdminPage
