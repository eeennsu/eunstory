import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const params = request.nextUrl.searchParams
    const keyword = params.get('keyword')

    if (!keyword) {
        return NextResponse.json({ error: 'Keyword not found' }, { status: 404 })
    }

    try {
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: keyword,
                },
                tags: {
                    contains: keyword,
                },
            },
        })

        if (!posts) {
            return NextResponse.json({ error: 'Posts not found' }, { status: 404 })
        }

        return NextResponse.json({ posts })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export type ResponseGetSearchedPostList = NextResponseData<typeof GET>
