import prisma from '@/lib/prisma/prisma-client'
import { NextResponse } from 'next/server'

type Params = {
    params: {
        id: string
    }
}

export const GET = async (request: Request, { params }: Params) => {
    const id = params?.id

    if (!id) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
    }

    try {
        const post = prisma.post.findFirst({
            where: {
                id,
            },
        })

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json({ data: { post } })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
