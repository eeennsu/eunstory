'use server'

import { ResponseGetDetailPostType } from '@/app/api/post/[id]/route'
import { ResponseGetPostListType } from '@/app/api/post/route'
import { getUrlFromServer, generateRequest } from '@/lib/fetch'

export const serverRequestGetAllPostList = async ({ isPublished }: { isPublished: boolean }) => {
    const params = new URLSearchParams()
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetPostListType>({
        url: getUrlFromServer(`/api/post?${params.toString()}`),
        config: {
            cache: 'no-store',
        },
    })
}

export const serverRequestGetSomePostList = async ({
    curPage = 1,
    perPage = 5,
}: {
    curPage?: number
    perPage?: number
}) => {
    const params = new URLSearchParams()
    params.append('curPage', curPage.toString())
    params.append('perPage', perPage.toString())

    return generateRequest<undefined, ResponseGetPostListType>({
        url: getUrlFromServer(`/api/post/?${params.toString()}`),
        config: {
            next: {
                revalidate: 60 * 60, // 1 hours
            },
        },
    })
}

export const serverRequestGetDetailPost = async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
    if (!id) {
        throw new Error(`Post ID is required`)
    }

    const params = new URLSearchParams()
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: getUrlFromServer(`/api/post/${id}?${params.toString()}`),
    })
}

export const serverRequestGetPostIdList = async () => {
    return generateRequest<undefined, ResponseGetPostListType>({
        url: getUrlFromServer(`/api/post/id-list`),
    })
}