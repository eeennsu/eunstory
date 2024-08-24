import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

type Params = {
    params: {
        id: string
    }
}

// get detail post
export const GET = async (_: Request, { params }: Params) => {
    const id = params?.id

    if (!id) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const post = (await prisma.post.findFirst({
            where: {
                id,
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
