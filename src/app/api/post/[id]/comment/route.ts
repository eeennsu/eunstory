import { getServerAuth } from '@/lib/auth'
import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { routePaths } from '@/lib/route'
import { Comment } from '@prisma/client'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type Params = {
    params: {
        id?: string
    }
}

// get detail post comment
export const GET = async (_: NextRequest, { params }: Params) => {
    try {
        const postId = params?.id

        if (!postId) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId,
                isActive: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        isAdmin: true,
                    },
                },
                parent: true,
            },
        })

        const commentCount = await prisma.comment.count({
            where: {
                postId,
                isActive: true,
                parentId: null,
            },
        })

        if (!comments) {
            return NextResponse.json({ error: 'Comments not found' }, { status: 404 })
        }

        if (!comments.length) {
            return NextResponse.json({ comments: [], commentCount: 0 })
        }

        return NextResponse.json({ comments, commentCount })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// create post comment
export const POST = async (request: NextRequest, { params }: Params) => {
    const { isAuthenticated, user } = await getServerAuth()

    if (!isAuthenticated || !user?.['@id']) {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
    }

    try {
        const postId = params?.id

        if (!postId) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const body = await request.json()
        const content = body?.content
        const parentId = body?.parentId

        if (!content) {
            return NextResponse.json({ error: 'Content and authorId are required' }, { status: 400 })
        }

        const createdComment = await prisma.comment.create({
            data: {
                postId,
                content,
                authorId: user['@id'],
                updatedAt: null,
                ...(parentId && { parentId }),
            },
        })

        if (!createdComment || !createdComment?.id) {
            return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
        }

        revalidateTag('post-comment')
        revalidatePath(routePaths.post.detail(postId))

        return NextResponse.json({ comment: createdComment }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// edit post comment
export const PATCH = async (request: NextRequest, { params }: Params) => {
    const { isAuthenticated, user } = await getServerAuth()

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const postId = params?.id

        if (!postId) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const body = await request.json()
        const commentId = body?.id
        const content = body?.content
        const userId = body?.userId

        if (!commentId || !content || !userId) {
            return NextResponse.json({ error: 'Comment id, content, and user id are required' }, { status: 400 })
        }

        if (user?.['@id'] !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const editedComment = await prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                content,
                updatedAt: new Date(),
            },
        })

        if (!editedComment) {
            return NextResponse.json({ error: 'Failed to edit comment' }, { status: 500 })
        }

        revalidateTag('post-comment')
        revalidatePath(routePaths.post.detail(postId))

        return NextResponse.json({ comment: editedComment })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// delete post comment
export const DELETE = async (request: NextRequest, { params }: Params) => {
    const { isAuthenticated, user } = await getServerAuth()

    if (!isAuthenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const postId = params?.id

    if (!postId) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const body = await request.json()
        const commentId = body?.id
        const userId = body?.userId

        if (!commentId || !userId) {
            return NextResponse.json({ error: 'Comment id and user id are required' }, { status: 400 })
        }

        if (user?.['@id'] !== userId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

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

        revalidateTag('post-comment')
        revalidatePath(routePaths.post.detail(postId))

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostCommentListType = NextResponseData<typeof GET>
export type RequestCreatePostCommentType = Pick<Comment, 'content' | 'parentId'>
export type ResponseCreatePostCommentType = NextResponseData<typeof POST>
export type RequestEditPostCommentType = Pick<Comment, 'id' | 'content'> & { userId: string }
export type ResponseEditPostCommentType = NextResponseData<typeof PATCH>
export type RequestDeletePostCommentType = Pick<Comment, 'id'> & { userId: string }
export type ResponseDeletePostCommentType = NextResponseData<typeof DELETE>
