import type { Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma-client'
import { NextResponseData } from '@/lib/fetch'

// get post list
export const GET = async (request: Request) => {
    const searchParams = new URL(request.url).searchParams
    const curPage = Number(searchParams.get('curPage'))
    const perPage = Number(searchParams.get('perPage'))
    const tag = searchParams.get('tag') || ''

    try {
        const totalCount = await prisma.post.count()
        const posts = (await prisma.post.findMany({
            where: {
                isActive: true,
                isPublished: true,
                tags: {
                    contains: tag,
                },
            },
            skip: perPage * (curPage - 1),
            take: perPage,
            orderBy: {
                createdAt: 'desc',
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

        if (!title || !content || !authorId) {
            return NextResponse.json({ error: 'Title, content, and authorId are required' }, { status: 400 })
        }

        const createdPost = await prisma.post.create({
            data: {
                isActive: true,
                title,
                authorId,
                content,
                tags,
                isPublished,
            },
        })

        if (!createdPost) {
            return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
        }

        return NextResponse.json({ post: createdPost }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseCreatePostType = NextResponseData<typeof POST>
