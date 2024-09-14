import { getServerAdminAuth } from '@/lib/auth'
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
    const { isAdminAuthed } = await getServerAdminAuth()

    console.log('isAdminAuthed', isAdminAuthed)

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

export type ResponseGetCommentListType = NextResponseData<typeof GET>

export const POST = async (request: NextRequest, { params }: Params) => {
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

export type ResponseCreateCommentType = NextResponseData<typeof POST>

export const DELETE = async (request: NextRequest, { params }: Params) => {
    try {
        // const session = await getServerSession()
        // if (!session?.user.id)
        // const commentId = params?.id
        // const body = await request.json()
        // const authorId = body?.authorId
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
