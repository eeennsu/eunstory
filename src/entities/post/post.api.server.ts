'use server'

import { ResponseGetDetailPostType } from '@/app/api/post/[id]/route'
import { ResponseGetPostListType } from '@/app/api/post/route'
import { getUrlFromServer, generateRequest } from '@/lib/fetch'

export const serverRequestGetDefaultPostList = async () => {
    return generateRequest<undefined, ResponseGetPostListType>({
        url: getUrlFromServer('/api/post/?curPage=1&perPage=5'),
    })
}

export const serverRequestGetDetailPost = async ({ id }: { id: string }) => {
    if (!id) {
        throw new Error(`Post ID is required`)
    }

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: getUrlFromServer(`/api/post/${id}`),
    })
}
