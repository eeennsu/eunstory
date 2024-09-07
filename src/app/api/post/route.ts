import type { Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { routePaths } from '@/lib/route'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// get post list
export const GET = async (request: NextRequest) => {
    const searchParams = new URL(request.url).searchParams
    const curPage = Number(searchParams.get('curPage'))
    const perPage = Number(searchParams.get('perPage'))
    const tag = searchParams.get('tag') || ''

    console.log('curPage', curPage)
    console.log('perPage', perPage)

    try {
        const totalCount = await prisma.post.count()
        const posts = (await prisma.post.findMany({
            where: {
                isActive: true,
                isPublished: true,
                tags: {
                    contains: tag,
                },
                order: {
                    not: null,
                },
            },
            skip: perPage * (curPage - 1),
            take: perPage,
            orderBy: {
                order: 'desc',
            },
        })) as Post[]

        if (!posts) {
            return NextResponse.json({ error: 'Posts not found' }, { status: 404 })
        }

        return NextResponse.json({ totalCount, posts })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostListType = NextResponseData<typeof GET>

// create post
export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const { title, content, tags = '', authorId, isPublished } = body

        // TODO title debounce error
        if (!title || !content || !authorId) {
            return NextResponse.json({ error: 'Title, content, and authorId are required' }, { status: 400 })
        }

        const lastPostOrder = (
            await prisma.post.findFirst({
                where: {
                    isActive: true,
                },
                orderBy: {
                    order: 'desc',
                },
            })
        )?.order

        const createdPost = await prisma.post.create({
            data: {
                isActive: true,
                title,
                authorId,
                content,
                tags,
                isPublished,
                ...(lastPostOrder && { order: lastPostOrder + 1 }),
            },
        })

        if (!createdPost || !createdPost?.id) {
            return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
        }

        revalidatePath(routePaths.post.list())

        return NextResponse.json({ postId: createdPost.id }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseCreatePostType = NextResponseData<typeof POST>
