import { AdminSidebarMenuWidget } from '@/widgets/admin'
import type { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
            <AdminSidebarMenuWidget />
        </>
    )
}

export default Layout
