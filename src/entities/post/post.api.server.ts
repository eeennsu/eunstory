'use server'

import { ResponseGetPostNavigationType } from '@/app/api/post/[id]/navigation/route'
import { ResponseGetDetailPostType } from '@/app/api/post/[id]/route'
import { ResponseGetActivePostCountType } from '@/app/api/post/active-count/route'
import { ResponseGetPostListType } from '@/app/api/post/route'
import { ResponseGetSearchedPostListType } from '@/app/api/post/search/route'
import { ResponseGetPostTagListType } from '@/app/api/post/tags/route'
import { getUrlFromServer, generateRequest } from '@/lib/fetch'
import { PaginationParams } from '../common'

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
        url: getUrlFromServer(`/api/post/?${params.toString()}`),
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
    })
}

// export const serverRequestGetPostIdList = async () => {
//     return generateRequest<undefined, ResponseGetPostIdListType>({
//         url: getUrlFromServer(`/api/post/id-list`),
//     })
// }

export const serverRequestGetPostTagList = async () => {
    return generateRequest<undefined, ResponseGetPostTagListType>({
        url: getUrlFromServer(`/api/post/tags`),
    })
}

export const serverRequestGetActivePostCount = async ({
    lastThreeMonths = false,
}: { lastThreeMonths?: boolean } = {}) => {
    const params = new URLSearchParams()
    lastThreeMonths && params.append('filter', 'last-three-months')

    return generateRequest<undefined, ResponseGetActivePostCountType>({
        url: getUrlFromServer(`/api/post/active-count?${params.toString()}`),
    })
}

export const serverRequestGetPostNavigation = async ({ id, order }: { id: string; order: number }) => {
    const params = new URLSearchParams()
    params.append('order', order.toString())

    return generateRequest<undefined, ResponseGetPostNavigationType>({
        url: getUrlFromServer(`/api/post/${id}/navigation?${params.toString()}`),
    })
}

export const serverRequestGetPostListBySearch = async (keyword: string) => {
    const searchParams = new URLSearchParams()
    searchParams.append('keyword', keyword)

    return generateRequest<undefined, ResponseGetSearchedPostListType>({
        url: getUrlFromServer(`/api/post/search?${searchParams.toString()}`),
        config: {
            cache: 'no-store',
        },
    })
}
