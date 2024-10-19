import { NextResponseData } from '@/lib/fetch'
import { Post } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export const dynamic = 'force-dynamic'

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const keyword = searchParams.get('keyword')

    if (!keyword) {
        return NextResponse.json({ error: 'Keyword not found' }, { status: 404 })
    }

    try {
        const posts = (await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyword,
                        },
                    },
                    {
                        content: {
                            contains: keyword,
                        },
                    },
                    {
                        tags: {
                            contains: keyword,
                        },
                    },
                ],
            },
            select: {
                id: true,
                title: true,
                tags: true,
                thumbnail: true,
                createdAt: true,
            },
        })) as SearchedPost[]

        if (!posts) {
            return NextResponse.json({ error: 'Posts not found' }, { status: 404 })
        }

        return NextResponse.json({ posts })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export type SearchedPost = Pick<Post, 'id' | 'title' | 'tags' | 'thumbnail' | 'createdAt'>
export type ResponseGetSearchedPostListType = NextResponseData<typeof GET>
