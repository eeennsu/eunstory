import { ResponseCreatePostType } from '@/app/api/post/route'
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

    return generateRequest({ url: `/api/post?${params.toString()}` })
}

export const requestGetDetailPost = async ({ id }: { id: string }) => {
    if (!id) {
        throw new Error(`Post ID is required`)
    }

    return generateRequest({ url: `/api/post/${id}` })
}

export const requestCreatePost = async ({ post }: { post: Partial<Post> }) => {
    return generateRequest<Partial<Post>, ResponseCreatePostType>({
        url: `/api/post`,
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

export const requestDeletePost = async ({ id }: { id: string }) => {
    return generateRequest({ url: `/api/post/${id}`, method: 'DELETE' })
}
