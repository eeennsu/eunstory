import { ResponseGetDetailPostType } from '@/app/api/post/[id]/route'
import { ResponseGetPostListType } from '@/app/api/post/route'
import { ResponseGetSearchedPostListType } from '@/app/api/post/search/route'
import { generateRequest } from '@/lib/fetch'
import prisma from '../../../prisma/prisma-client'

export const serverRequestGetAllPostList = async ({ isPublished }: { isPublished: boolean }) => {
    const params = new URLSearchParams()
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetPostListType>({
        url: `/post?${params.toString()}`,
    })
}

export const serverRequestGetSomePostList = async ({
    curPage = 1,
    perPage = 10,
    tag,
    isPublished = true,
}: {
    curPage?: number
    perPage?: number
    tag?: string | null
    isPublished?: boolean
}) => {
    const paginationParams =
        curPage && perPage ? { skip: perPage * (curPage - 1), take: perPage } : { skip: 0, take: 10 }

    try {
        const totalCount = await prisma.post.count({
            where: {
                order: { not: null },
            },
        })

        const posts = await prisma.post.findMany({
            where: {
                isActive: true,
                ...(isPublished ? { order: { not: null } } : { order: null }),
                ...(tag && { tags: { has: tag } }),
            },
            orderBy: { order: 'desc' },
            ...paginationParams,
            select: {
                id: true,
                title: true,
                content: true,
                tags: true,
                thumbnail: true,
                summary: true,
                createdAt: true,
                order: true,
            },
        })

        return { totalCount: isPublished ? totalCount : posts.length, posts }
    } catch (error) {
        console.error('serverRequestGetSomePostList error:', error)
        return { error: 'Internal Server Error' }
    }
}

export const serverRequestGetDetailPost = async ({ postId, isPublished }: { postId: string; isPublished: boolean }) => {
    if (!postId) {
        throw new Error(`Post id must be required`)
    }

    const params = new URLSearchParams()
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: `/post/${postId}?${params.toString()}`,
        config: {
            next: {
                revalidate: 60 * 60, // 1 hours
            },
        },
    })
}

export const serverRequestGetPostListBySearch = async (keyword: string) => {
    const params = new URLSearchParams()
    params.append('keyword', keyword)

    return generateRequest<undefined, ResponseGetSearchedPostListType>({
        url: `/post/search?${params.toString()}`,
    })
}
