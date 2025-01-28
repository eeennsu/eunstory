import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'
import { NextResponseData } from '@/lib/fetch'

export const GET = async (_: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
            },
            where: {
                order: {
                    not: null,
                },
            },
        })

        if (!posts) {
            return NextResponse.json({ error: 'Post ids not found' }, { status: 404 })
        }

        console.log('posts', posts)

        return NextResponse.json({ postIds: posts.map((post) => post.id) })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostIdListType = NextResponseData<typeof GET>
