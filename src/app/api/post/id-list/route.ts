import { NextResponseData } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client';

export const GET = async (_: NextRequest) => {
    try {
        const ids = await prisma.post.findMany({
            select: {
                id: true,
            },
            where: {
                isActive: true,
                order: {
                    not: null,
                },
            },
        })

        if (!ids) {
            return NextResponse.json({ error: 'Post ids not found' }, { status: 404 })
        }

        return NextResponse.json({ ids })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetPostIdListType = NextResponseData<typeof GET>
