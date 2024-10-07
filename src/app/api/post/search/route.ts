import prisma from '@/lib/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const params = request.nextUrl.searchParams
    const keyword = params.get('keyword')

    if (!keyword) {
        return NextResponse.json({ error: 'Keyword not found' }, { status: 404 })
    }

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
}
