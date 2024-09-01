import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
    params: {
        id?: string
    }
}

// get detail post
export const GET = async (request: NextRequest, { params }: Params) => {
    const id = params?.id
    const searchParams = request.nextUrl.searchParams

    const isPublished = searchParams.get('isPublished') || '1'

    if (!id) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const post = (await prisma.post.findFirst({
            where: {
                id,
                ...(isPublished && { isPublished: isPublished === '1' }),
            },
        })) as Post

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json({ post })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetDetailPostType = NextResponseData<typeof GET>

// edit post
export const PATCH = async (request: Request, { params }: Params) => {
    try {
        const id = params?.id

        if (!id) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const body = await request.json()

        if (!body) {
            return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
        }

        const editedPost = (await prisma.post.update({
            where: {
                id,
            },
            data: {
                ...body,
            },
        })) as Post

        if (!editedPost) {
            return NextResponse.json({ error: 'Failed to edit post' }, { status: 500 })
        }

        return NextResponse.json({ post: editedPost })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponsePatchDetailPostType = NextResponseData<typeof PATCH>

// delete post
export const DELETE = async (_: Request, { params }: Params) => {
    try {
        const id = params?.id

        if (!id) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const deletedPost = (await prisma.post.update({
            where: {
                id,
            },
            data: {
                isActive: false,
            },
        })) as Post

        if (!deletedPost) {
            return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
        }

        return NextResponse.next({ status: 204 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseDeleteDetailPostType = NextResponseData<typeof DELETE>
