import type { Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { routePaths } from '@/lib/route'
import { revalidatePath } from 'next/cache'

// get post list
export const GET = async (request: NextRequest) => {
    const requestUrl = new URL(request.url)
    const params = requestUrl.searchParams
    const curPage = Number(params.get('curPage'))
    const perPage = Number(params.get('perPage'))
    const tag = params.get('tag')
    const isPublished = params.get('isPublished')?.toString() === 'true'

    const paginationParams = curPage &&
        perPage && {
            skip: perPage * (curPage - 1),
            take: perPage,
        }

    try {
        const totalCount = await prisma.post.count({
            where: {
                order: {
                    not: null,
                },
            },
        })
        const posts = (await prisma.post.findMany({
            where: {
                isActive: true,
                ...(isPublished && { order: { not: null } }),
                ...(tag && {
                    tags: {
                        contains: tag,
                    },
                }),
            },
            orderBy: {
                order: 'desc',
            },
            ...(paginationParams && { ...paginationParams }),
        })) as Post[]

        if (!posts) {
            return NextResponse.json({ error: 'Posts not found' }, { status: 404 })
        }

        return NextResponse.json({ totalCount, posts })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// create post
export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const { title, content, tags, authorId, order } = body

        // TODO title debounce error
        if (!title || !content || !authorId) {
            return NextResponse.json({ error: 'Title, content, and authorId are required' }, { status: 400 })
        }

        let isTemporarySave = false
        let lastPostOrder = null

        if (order === undefined) {
            lastPostOrder = (
                await prisma.post.findFirst({
                    where: {
                        isActive: true,
                        order: {
                            not: null,
                        },
                    },
                    orderBy: {
                        order: 'desc',
                    },
                })
            )?.order
        } else if (order === null) {
            isTemporarySave = true
        }

        const createdPost = await prisma.post.create({
            data: {
                isActive: true,
                title,
                authorId,
                content,
                tags,
                ...(lastPostOrder && { order: lastPostOrder + 1 }),
            },
        })

        if (!createdPost || !createdPost?.id) {
            return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
        }

        if (!isTemporarySave) {
            revalidatePath(routePaths.post.list())
        }

        return NextResponse.json({ postId: createdPost.id }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// update post order
export const PATCH = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const updatedSequences = (body?.updatedSequences || []) as Array<{ id: string; sequence: number }>

        if (!updatedSequences) {
            return NextResponse.json({ error: 'Updated sequences are required' }, { status: 400 })
        }

        await Promise.all(
            updatedSequences.map((post) =>
                prisma.post.update({
                    where: {
                        id: post.id,
                    },
                    data: {
                        order: post.sequence,
                    },
                })
            )
        )

        revalidatePath(routePaths.post.list())

        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostListType = NextResponseData<typeof GET>
export type RequestCreatePostType = Pick<Post, 'title' | 'content' | 'tags' | 'authorId' | 'order'>
export type ResponseCreatePostType = NextResponseData<typeof POST>
export type ResponsePatchPostOrderType = NextResponseData<typeof PATCH>
