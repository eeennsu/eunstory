import { generateRequest } from '@/lib/fetch'
import { PaginationParams } from '../common'
import { ResponseGetAllCommentListType } from '@/app/api/admin/comment/route'
import { ResponseGetAccountListType } from '@/app/api/admin/account/route'

export const requestGetAllCommentList = async ({ curPage, perPage }: PaginationParams) => {
    const params = new URLSearchParams()
    params.append('curPage', curPage?.toString() || '1')
    params.append('perPage', perPage?.toString() || '10')

    return generateRequest<undefined, ResponseGetAllCommentListType>({
        url: `/admin/comment?${params.toString()}`,
        config: {
            cache: 'no-store',
        },
    })
}

export const requestGetAllAccounts = async ({ curPage, perPage }: PaginationParams) => {
    const params = new URLSearchParams()
    params.append('curPage', curPage?.toString() || '1')
    params.append('perPage', perPage?.toString() || '10')

    return generateRequest<undefined, ResponseGetAccountListType>({
        url: `/admin/account?${params.toString()}`,
        config: {
            cache: 'no-store',
        },
    })
}
