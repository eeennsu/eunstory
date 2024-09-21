import { getServerAuth } from '@/lib/auth'
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

    const isPublished = searchParams.get('isPublished')?.toString() === 'true'

    if (!id) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const post = (await prisma.post.findFirst({
            where: {
                id,
                ...(isPublished && { order: { not: null } }),
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
export const PATCH = async (request: NextRequest, { params }: Params) => {
    try {
        const { isAdminAuthorized } = await getServerAuth()

        if (!isAdminAuthorized) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const id = params?.id

        if (!id) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
        }

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
                })
            )?.order

            if (!lastPostOrder) {
                return NextResponse.json({ error: 'Failed to get last post order' }, { status: 500 })
            }

            body.order = lastPostOrder + 1
        }

        const editedPost = (await prisma.post.update({
            where: {
                id,
            },
            data: {
                ...body,
                updatedAt: new Date(),
            },
        })) as Post

        if (!editedPost) {
            return NextResponse.json({ error: 'Failed to edit post' }, { status: 500 })
        }

        revalidatePath(routePaths.post.list())
        revalidatePath(routePaths.post.detail(editedPost.id))

        return NextResponse.json({ post: editedPost })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// delete post
export const DELETE = async (request: NextRequest, { params }: Params) => {
    const { isAdminAuthorized, user } = await getServerAuth()

    if (!isAdminAuthorized) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = params?.id

    if (!id) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const { searchParams } = request.nextUrl
        const isPublishedDelete = searchParams.get('isPublished')

        const beDeletedPost = (await prisma.post.findFirst({
            where: {
                id,
            },
        })) as Post

        if (user?.['@id'] !== beDeletedPost.authorId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const softDeletedPost = (await prisma.post.update({
            where: {
                id,
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

        revalidatePath(routePaths.post.list())

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetDetailPostType = NextResponseData<typeof GET>
export type RequestEditDetailPostType = Partial<Pick<Post, 'title' | 'content' | 'tags' | 'order' | 'authorId'>>
export type ResponseEditDetailPostType = NextResponseData<typeof PATCH>
export type ResponseDeleteDetailPostType = NextResponseData<typeof DELETE>
