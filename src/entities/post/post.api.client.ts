import {
    RequestEditDetailPostType,
    ResponseEditDetailPostType,
    ResponseGetDetailPostType,
} from '@/app/api/post/[id]/route'
import { RequestCreatePostType, ResponseCreatePostType, ResponseGetPostListType } from '@/app/api/post/route'
import { generateRequest } from '@/lib/fetch'
import { Post } from '@prisma/client'

export const requestGetPostList = async ({
    tag,
    curPage,
    perPage,
    isPublished,
}: {
    curPage?: number
    perPage?: number
    tag?: string
    isPublished?: boolean
}) => {
    const params = new URLSearchParams()
    tag && params.append('tag', tag)
    curPage && params.append('curPage', curPage.toString())
    perPage && params.append('perPage', perPage.toString())
    isPublished && params.append('isPublished', isPublished.toString())

    const url = params.size !== 0 ? `/api/post?${params.toString()}` : '/api/post'

    return generateRequest<undefined, ResponseGetPostListType>({
        url,
    })
}

export const requestCreatePost = async (createdPost: RequestCreatePostType) => {
    return generateRequest<RequestCreatePostType, ResponseCreatePostType>({
        url: '/api/post',
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
        url: `/api/post/${postId}`,
        method: 'PATCH',
        body: editedPost,
    })
}

export const requestDeletePost = async ({ postId, isPublished }: { postId: string; isPublished: boolean }) => {
    const searchParams = new URLSearchParams()
    searchParams.append('isPublished', String(isPublished))

    return generateRequest<undefined, null>({ url: `/api/post/${postId}?${searchParams.toString()}`, method: 'DELETE' })
}

export const requestGetDetailPost = async ({ postId, isPublished }: { postId: string; isPublished?: boolean }) => {
    const searchParams = new URLSearchParams()

    isPublished && searchParams.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: `/api/post/${postId}?${searchParams.toString()}`,
    })
}

type RequestEditPostListOrder = {
    updatedSequences: Array<{ id: Post['id']; sequence: number }>
}

export const requestEditPostListOrder = async ({ updatedSequences }: RequestEditPostListOrder) => {
    return generateRequest<RequestEditPostListOrder, {}>({
        url: '/api/post',
        method: 'PATCH',
        body: {
            updatedSequences,
        },
    })
}

