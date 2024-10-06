import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

// get prev, next post

export const GET = async (request: NextRequest) => {
    const params = request.nextUrl.searchParams
    const order = params.get('order')

    if (!order) {
        return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
    }

    console.log(order)

    try {
        const prevPost =
            (await prisma.post.findFirst({
                where: {
                    order: Number(order) - 1,
                },
            })) || null

        const nextPost =
            (await prisma.post.findFirst({
                where: {
                    order: Number(order) + 1,
                },
            })) || null

        return NextResponse.json({ prevPost, nextPost })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostNavigationType = NextResponseData<typeof GET>
