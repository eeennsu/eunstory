import { getServerAdminAuth } from '@/lib/auth'
import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { routePaths } from '@/lib/route'
import { Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
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

    const isPublished = searchParams.get('isPublished')

    if (!id) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const post = (await prisma.post.findFirst({
            where: {
                id,
                order: isPublished ? { not: null } : null,
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
export const PATCH = async (request: NextRequest, { params }: Params) => {
    try {
        const { isAdminAuthed } = await getServerAdminAuth()

        if (!isAdminAuthed) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

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
export const DELETE = async (request: NextRequest, { params }: Params) => {
    const { isAdminAuthed } = await getServerAdminAuth()

    if (!isAdminAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const isPublishedDelete = searchParams.get('isPublished')

    try {
        const id = params?.id

        if (!id) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

        const beDeletedPost = (await prisma.post.findFirst({
            where: {
                id,
            },
        })) as Post

        const softDeletedPost = (await prisma.post.update({
            where: {
                id,
            },
            data: {
                isActive: false,
                order: null,
            },
        })) as Post

        if (!softDeletedPost) {
            return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
        }

        // update all posts order if deleted post is published
        if (isPublishedDelete && beDeletedPost.order) {
            await prisma.post.updateMany({
                where: {
                    order: {
                        gt: beDeletedPost.order,
                        not: null,
                    },
                },
                data: {
                    order: {
                        decrement: 1,
                    },
                },
            })
        }

        revalidatePath(routePaths.post.list())

        return NextResponse.json({})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseDeleteDetailPostType = NextResponseData<typeof DELETE>
