import { NextResponseData } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export const dynamic = 'force-dynamic'

export const GET = async (_: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                tags: true,
            },
        })

        const allTags = posts
            .flatMap((post) => post.tags || [])
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
