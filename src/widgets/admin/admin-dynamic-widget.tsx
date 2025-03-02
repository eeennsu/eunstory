'use client'

import dynamic from 'next/dynamic'

export const AdminAccountsWidgetDynamic = dynamic(
    () => import('@/widgets/admin/admin-accounts-widget').then((module) => module.AdminAccountsWidget),
    { ssr: false }
)

export const AdminCommentsWidgetDynamic = dynamic(
    () => import('@/widgets/admin/admin-comments-widget').then((module) => module.AdminCommentsWidget),
    { ssr: false }
)
