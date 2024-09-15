import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { routePaths } from '@/lib/route'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
    params: {
        id?: string
    }
}

export const GET = async (_: NextRequest, { params }: Params) => {
    try {
        const postId = params?.id

        if (!postId) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        const commentCount = await prisma.comment.count({
            where: {
                postId,
            },
        })

        if (!comments) {
            return NextResponse.json({ error: 'Comments not found' }, { status: 404 })
        }

        return NextResponse.json({ comments, commentCount })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const POST = async (request: NextRequest, { params }: Params) => {
    const session = await getServerSession()

    if (!session?.user || !session?.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const postId = params?.id

        if (!postId) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const body = await request.json()
        const content = body?.content
        const authorId = body?.authorId

        if (!content || !authorId) {
            return NextResponse.json({ error: 'Content and authorId are required' }, { status: 400 })
        }

        const createdComment = await prisma.comment.create({
            data: {
                postId,
                content,
                authorId,
            },
        })

        if (!createdComment || !createdComment?.id) {
            return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
        }

        revalidatePath(routePaths.post.detail(postId))

        return NextResponse.json({ comment: createdComment }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const DELETE = async (request: NextRequest, { params }: Params) => {
    const session = await getServerSession()

    if (!session?.user || !session?.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const postId = params?.id

    if (!postId) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const body = await request.json()
        const commentId = body?.commentId

        const deletedComment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                isActive: false,
                deletedAt: new Date(),
            },
        })

        if (!deletedComment) {
            return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
        }

        revalidatePath(routePaths.post.detail(postId))

        return NextResponse.json({}, { status: 204 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostCommentListType = NextResponseData<typeof GET>
export type ResponseCreatePostCommentType = NextResponseData<typeof POST>
export type ResponseDeletePostCommentType = NextResponseData<typeof DELETE>
