import { getServerAuth } from '@/lib/auth'
import { NextResponseData } from '@/lib/fetch'
import { mainPath } from '@/lib/route'
import { Post } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

type Params = {
    params: Promise<{
        id?: string
    }>
}

// get detail post
export const GET = async (request: NextRequest, { params }: Params) => {
    const postId = (await params)?.id

    const searchParams = request.nextUrl.searchParams

    const isPublished = searchParams.get('isPublished')?.toString() === 'true'

    if (!postId) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const post = (await prisma.post.findFirst({
            where: {
                id: postId,
                ...(isPublished && { order: { not: null } }),
            },
        })) as Post

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json({ post })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

// edit post
export const PATCH = async (request: NextRequest, { params }: Params) => {
    const { isAdminAuthorized } = await getServerAuth()

    if (!isAdminAuthorized) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 401 })
    }

    const postId = (await params)?.id

    if (!postId) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const body = await request.json()
        const order = body?.order

        if (!body) {
            return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
        }

        // order 가 -1인것은, 임시저장된 포스트가 생성되기 위해 사용되는 값임.

        if (order === -1) {
            const lastPostOrder = (
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
                    select: { order: true }, // 필요한 필드만 선택
                })
            )?.order

            body.order = lastPostOrder ? lastPostOrder + 1 : 0
        }

        const editedPost = (await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                ...body,
                updatedAt: new Date(),
            },
        })) as Post

        if (!editedPost) {
            return NextResponse.json({ error: 'Failed to edit post' }, { status: 500 })
        }

        revalidatePath(mainPath.post.list())
        revalidatePath(mainPath.post.detail(editedPost.id))

        return NextResponse.json({ post: editedPost })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

// delete post
export const DELETE = async (request: NextRequest, { params }: Params) => {
    const { isAdminAuthorized, user } = await getServerAuth()

    if (!isAdminAuthorized) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 401 })
    }

    const postId = (await params)?.id

    if (!postId) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const { searchParams } = request.nextUrl
        const isPublishedDelete = searchParams.get('isPublished')

        const beDeletedPost = (await prisma.post.findFirst({
            where: {
                id: postId,
            },
        })) as Post

        if (user?.['@id'] !== beDeletedPost.authorId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const softDeletedPost = (await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                isActive: false,
                order: null,
                deletedAt: new Date(),
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

        revalidatePath(mainPath.post.list())

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetDetailPostType = NextResponseData<typeof GET>
export type RequestEditDetailPostType = Partial<
    Pick<Post, 'title' | 'content' | 'tags' | 'order' | 'authorId' | 'summary' | 'thumbnail'>
>
export type ResponseEditDetailPostType = NextResponseData<typeof PATCH>
export type ResponseDeleteDetailPostType = NextResponseData<typeof DELETE>
