'use client'

import { ResponseGetAccountListType } from '@/app/api/admin/account/route'
import { requestGetAllAccounts } from '@/entities/admin'
import { AccountItem } from '@/features/admin'
import { Pagination } from '@/features/common/pagination'
import { useAdminPagination, useAsync, useToast } from '@/lib/hooks'
import { DashboardDataTitle } from '@/shared/admin'
import { DashboardDataContainer } from '@/shared/admin/dashboard-data-container'
import { EllipsisLoading } from '@/shared/common'
import { useState, type FC } from 'react'

export type Account = Extract<ResponseGetAccountListType, { accounts: any }>['accounts'][number]

export const AdminAccountsWidget: FC = () => {
    const { toast } = useToast()

    const { accountPage, setCurDashboardPage } = useAdminPagination()

    const [accounts, setAccounts] = useState<Account[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const { isLoading, error } = useAsync(async () => {
        const responseAccounts = await requestGetAllAccounts({ curPage: accountPage, perPage: 100 })

        if ('error' in responseAccounts) {
            toast({ title: '계정 목록을 불러오는 중 오류가 발생했습니다.', type: 'error' })
            setAccounts([])
            return
        }

        setAccounts(responseAccounts.accounts)
        setTotalPage(responseAccounts.totalPage)
    }, [accountPage])

    return (
        <DashboardDataContainer
            id='admin-dashboard-users'
            className='flex flex-col gap-4'>
            <DashboardDataTitle title='계정 목록' />
            {isLoading && <EllipsisLoading className='h-[232px]' />}
            {!error && (
                <section className='grid grid-cols-4 gap-5'>
                    {accounts?.map((account) => (
                        <AccountItem
                            key={account.id}
                            account={account}
                        />
                    ))}
                </section>
            )}
            <Pagination
                curPage={accountPage}
                totalPage={totalPage}
                onPageChange={(page) => {
                    setCurDashboardPage({ page, type: 'account' })
                }}
            />
        </DashboardDataContainer>
    )
}
