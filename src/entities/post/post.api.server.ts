'use server'

import { ResponseGetDetailPostType } from '@/app/api/post/[id]/route'
import { ResponseGetActivePostCountType } from '@/app/api/post/active-count/route'
import { ResponseGetPostListType } from '@/app/api/post/route'
import { ResponseGetSearchedPostListType } from '@/app/api/post/search/route'
import { ResponseGetPostTagListType } from '@/app/api/post/tags/route'
import { getUrlFromServer, generateRequest } from '@/lib/fetch'
import { PaginationParams } from '../common'
import { ResponseGetPostIdListType } from '@/app/api/post/ids/route'

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
    isPublished,
}: PaginationParams & {
    isPublished: boolean
}) => {
    const params = new URLSearchParams()
    params.append('curPage', curPage.toString())
    params.append('perPage', perPage.toString())
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetPostListType>({
        url: getUrlFromServer(`/api/post?${params.toString()}`),
        config: {
            next: {
                revalidate: 60 * 60, // 1 hours
            },
        },
    })
}

export const serverRequestGetDetailPost = async ({ postId, isPublished }: { postId: string; isPublished: boolean }) => {
    if (!postId) {
        throw new Error(`Post id must be required`)
    }

    const params = new URLSearchParams()
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: getUrlFromServer(`/api/post/${postId}?${params.toString()}`),
        config: {
            next: {
                revalidate: 60 * 60, // 1 hours
            },
        },
    })
}

export const serverRequestGetPostIds = async () => {
    return generateRequest<undefined, ResponseGetPostIdListType>({
        url: getUrlFromServer(`/api/post/ids`),
    })
}

export const serverRequestGetPostTagList = async () => {
    return generateRequest<undefined, ResponseGetPostTagListType>({
        url: getUrlFromServer(`/api/post/tags`),
        config: {
            cache: 'no-store',
        },
    })
}

export const serverRequestGetActivePostCount = async (recentlyMonth?: number) => {
    const params = new URLSearchParams()
    recentlyMonth && params.append('recently', recentlyMonth.toString())

    return generateRequest<undefined, ResponseGetActivePostCountType>({
        url: getUrlFromServer(`/api/post/active-count?${params.toString()}`),
    })
}

export const serverRequestGetPostListBySearch = async (keyword: string) => {
    const params = new URLSearchParams()
    params.append('keyword', keyword)

    return generateRequest<undefined, ResponseGetSearchedPostListType>({
        url: getUrlFromServer(`/api/post/search?${params.toString()}`),
        config: {
            cache: 'no-store',
        },
    })
}
