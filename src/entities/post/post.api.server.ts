'use server'

import { ResponseGetDetailPostType } from '@/app/api/post/[id]/route'
import { ResponseGetPostListType } from '@/app/api/post/route'
import { getUrlFromServer, serverRequest } from '@/lib/fetch'

export const requestGetDefaultPostList = async () => {
    return serverRequest<undefined, ResponseGetPostListType>({
        url: getUrlFromServer('/api/post/?curPage=1&perPage=5'),
    })
}

export const requestGetDetailPost = async ({ id }: { id: string }) => {
    if (!id) {
        throw new Error(`Post ID is required`)
    }

    return serverRequest<undefined, ResponseGetDetailPostType>({
        url: getUrlFromServer(`/api/post/${id}`),
    })
}
