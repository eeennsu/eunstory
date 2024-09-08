import { ResponseGetDetailPostType } from '@/app/api/post/[id]/route'
import { ResponseCreatePostType, ResponseGetPostListType } from '@/app/api/post/route'
import { generateRequest } from '@/lib/fetch'
import { Post } from '@prisma/client'

export const requestGetPostList = async ({
    tag,
    curPage = 1,
    perPage = 5,
}: {
    curPage: number
    perPage: number
    tag?: string
}) => {
    const params = new URLSearchParams()
    tag && params.append('tag', tag)
    params.append('curPage', curPage.toString())
    params.append('perPage', perPage.toString())

    return generateRequest<undefined, ResponseGetPostListType>({ url: `/api/post?${params.toString()}` })
}

export const requestCreatePost = async ({ post }: { post: Partial<Post> }) => {
    return generateRequest<Partial<Post>, ResponseCreatePostType>({
        url: '/api/post',
        method: 'POST',
        body: post,
    })
}

export const requestEditPost = async ({ id, post }: { id: string; post: Partial<Post> }) => {
    return generateRequest<Partial<Post>, ResponseCreatePostType>({
        url: `/api/post/${id}`,
        method: 'PATCH',
        body: post,
    })
}

export const requestDeletePost = async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
    const searchParams = new URLSearchParams()
    searchParams.append('isPublished', String(isPublished))

    return generateRequest<undefined, null>({ url: `/api/post/${id}?${searchParams.toString()}`, method: 'DELETE' })
}

export const requestGetDetailPost = async ({ id, isPublished }: { id: string; isPublished?: boolean }) => {
    const searchParams = new URLSearchParams()

    isPublished && searchParams.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: `/api/post/${id}?${searchParams.toString()}`,
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
