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

export const requestGetDetailPost = async ({ id, isPublished }: { id: string; isPublished?: boolean }) => {
    const query = new URLSearchParams()
    isPublished !== undefined && query.append('isPublished', isPublished ? '1' : '0')

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: `/api/post/${id}?${query.toString()}`,
    })
}
