import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (_: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                tags: true,
            },
        })

        const allTags = posts
            .flatMap((post) => post.tags?.split(',') || [])
            .map((tag) => tag.trim())
            .filter((tag, i, arr) => tag && arr.indexOf(tag) === i)

        if (!allTags) {
            return NextResponse.json({ error: 'Post tags not found' }, { status: 404 })
        }

        return NextResponse.json({ tags: allTags })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostTagListType = NextResponseData<typeof GET>
