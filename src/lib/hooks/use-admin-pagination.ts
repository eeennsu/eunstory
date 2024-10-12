import { usePathname, useSearchParams } from 'next/navigation'
import { useProgressBar } from './use-progress-bar'
import { adminPageParams } from '../route'

export const useAdminPagination = () => {
    const pathName = usePathname()
    const params = useSearchParams()
    const { barRouter } = useProgressBar()

    const pageParams = {
        accountPage: Number(params.get(adminPageParams.account)) || 1,
        commentPage: Number(params.get(adminPageParams.comment)) || 1,
    }

    const setCurDashboardPage = ({ page, type }: { page: number; type: 'account' | 'comment' }) => {
        const searchParams = new URLSearchParams(params.toString())

        type === 'account' && searchParams.set(adminPageParams.account, page.toString())
        type === 'comment' && searchParams.set(adminPageParams.comment, page.toString())

        barRouter.push(`${pathName}?${searchParams.toString()}`, { scroll: false })
    }

    return { ...pageParams, setCurDashboardPage }
}
