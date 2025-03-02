import {
    RequestEditDetailPostType,
    ResponseEditDetailPostType,
    ResponseGetDetailPostType,
} from '@/app/api/post/[id]/route'
import { RequestCreatePostType, ResponseCreatePostType, ResponseGetPostListType } from '@/app/api/post/route'
import { generateRequest } from '@/lib/fetch'
import { Post } from '@prisma/client'
import { PaginationParams } from '../common'
import { ResponseGetPostNavigationType } from '@/app/api/post/[id]/navigation/route'
import { ResponseGetActivePostCountType } from '@/app/api/post/active-count/route'

export const requestGetAllPostList = async ({ isPublished }: { isPublished: boolean }) => {
    const params = new URLSearchParams()
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetPostListType>({
        url: `/post?${params.toString()}`,
    })
}

export const requestGetPostList = async ({
    tag,
    curPage,
    perPage,
    isPublished,
}: PaginationParams & {
    tag?: string
    isPublished?: boolean
}) => {
    const params = new URLSearchParams()
    tag && params.append('tag', tag)
    curPage && params.append('curPage', curPage.toString())
    perPage && params.append('perPage', perPage.toString())
    isPublished && params.append('isPublished', isPublished.toString())

    const url = params.size !== 0 ? `/post?${params.toString()}` : '/post'

    return generateRequest<undefined, ResponseGetPostListType>({
        url,
    })
}

export const requestCreatePost = async (createdPost: RequestCreatePostType) => {
    return generateRequest<RequestCreatePostType, ResponseCreatePostType>({
        url: '/post',
        method: 'POST',
        body: createdPost,
    })
}

export const requestEditPost = async ({
    postId,
    editedPost,
}: {
    postId: string
    editedPost: RequestEditDetailPostType
}) => {
    return generateRequest<RequestEditDetailPostType, ResponseEditDetailPostType>({
        url: `/post/${postId}`,
        method: 'PATCH',
        body: editedPost,
    })
}

export const requestDeletePost = async ({ postId, isPublished }: { postId: string; isPublished: boolean }) => {
    const searchParams = new URLSearchParams()
    searchParams.append('isPublished', String(isPublished))

    return generateRequest<undefined, null>({ url: `/post/${postId}?${searchParams.toString()}`, method: 'DELETE' })
}

export const requestGetDetailPost = async ({ postId, isPublished }: { postId: string; isPublished?: boolean }) => {
    const searchParams = new URLSearchParams()

    isPublished && searchParams.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: `/post/${postId}?${searchParams.toString()}`,
    })
}

type RequestEditPostListOrder = {
    updatedSequences: Array<{ id: Post['id']; sequence: number }>
}

export const requestEditPostListOrder = async ({ updatedSequences }: RequestEditPostListOrder) => {
    return generateRequest<RequestEditPostListOrder, {}>({
        url: '/post',
        method: 'PATCH',
        body: {
            updatedSequences,
        },
    })
}

export const requestGetPostNavigation = async ({ id, order }: { id: string; order: number }) => {
    const params = new URLSearchParams()
    params.append('order', order.toString())

    return generateRequest<undefined, ResponseGetPostNavigationType>({
        url: `/post/${id}/navigation?${params.toString()}`,
    })
}

export const requestGetPostTagList = async () => {
    return generateRequest<undefined, { tags: string[] }>({
        url: '/post/tags',
    })
}

export const requestGetActivePostCount = async (recentlyMonth?: number) => {
    const params = new URLSearchParams()
    recentlyMonth && params.append('recently', recentlyMonth.toString())

    return generateRequest<undefined, ResponseGetActivePostCountType>({
        url: `/post/active-count?${params.toString()}`,
    })
}
