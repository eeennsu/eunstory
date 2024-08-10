import prisma from '@/lib/prisma/prisma-client'
import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
    const searchParams = new URL(request.url).searchParams
    const perPage = Number(searchParams.get('perPage')) || 5
    const curPage = Number(searchParams.get('curPage')) || 1

    try {
        const posts = (await prisma.post.findMany({
            where: {
                published: true,
            },
            skip: perPage * (curPage - 1),
            take: perPage,
            orderBy: {
                createdAt: 'desc',
            },
        })) as Post[]

        if (!posts) {
            return NextResponse.json({ error: 'Posts not found' }, { status: 404 })
        }

        return NextResponse.json({ data: { posts } })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
