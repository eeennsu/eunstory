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

        console.log(
            'posts:',
            posts.map((post) => post.title)
        )

        return { totalCount: isPublished ? totalCount : posts.length, posts }
    } catch (error) {
        console.error('serverRequestGetSomePostList error:', error)
        return { error: 'Internal Server Error' }
    }
}

export const serverRequestGetPostListBySearch = async (keyword: string) => {
    const params = new URLSearchParams()
    params.append('keyword', keyword)

    return generateRequest<undefined, ResponseGetSearchedPostListType>({
        url: `/post/search?${params.toString()}`,
    })
}

export const serverRequestGetDetailPost = async ({ postId, isPublished }: { postId: string; isPublished: boolean }) => {
    if (!postId) {
        throw new Error(`Post id must be required`)
    }

    const params = new URLSearchParams()
    params.append('isPublished', isPublished.toString())

    return generateRequest<undefined, ResponseGetDetailPostType>({
        url: `/post/${postId}?${params.toString()}`,
    })
}

// export const serverRequestGetDetailPost = async ({ postId, isPublished }: { postId: string; isPublished: boolean }) => {
//     if (!postId) {
//         throw new Error(`Post id must be required`)
//     }

//     try {
//         const post = await prisma.post.findFirst({
//             where: {
//                 id: postId,
//                 ...(isPublished && { order: { not: null } }),
//             },
//         })

//         if (!post) {
//             throw new Error(`Post not found`)
//         }

//         console.log('success detail post title :', post.title)

//         return { post }
//     } catch (error) {
//         console.error('❌ serverRequestGetDetailPost error:', error)
//         return { error: 'Internal Server Error' }
//     }
// }
