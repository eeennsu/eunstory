import { generateRequest, getUrlFromServer } from '@/lib/fetch'
import { PaginationParams } from '../common'
import { ResponseGetAllCommentListType } from '@/app/api/admin/comment/route'

export const serverRequestGetAllCommentList = async ({ curPage, perPage }: PaginationParams) => {
    const params = new URLSearchParams()
    params.append('curPage', curPage?.toString() || '1')
    params.append('perPage', perPage?.toString() || '10')

    return generateRequest<undefined, ResponseGetAllCommentListType>({
        url: getUrlFromServer(`/api/admin/comment?${params.toString()}`),
    })
}

export const serverRequestGetAccounts = async ({ curPage, perPage }: PaginationParams) => {
    const params = new URLSearchParams()
    params.append('curPage', curPage?.toString() || '1')
    params.append('perPage', perPage?.toString() || '10')

    return generateRequest<undefined, ResponseGetAllCommentListType>({
        url: getUrlFromServer(`/api/admin/account?${params.toString()}`),
        config: {
            next: {
                tags: ['account'],
            },
        },
    })
}
