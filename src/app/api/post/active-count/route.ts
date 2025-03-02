import { NextResponseData } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams

        const recently = Number(searchParams.get('recently'))

        const filterOptions = {
            ...(recently > 0 && {
                createdAt: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - recently)),
                },
            }),
        }

        const activeCount = await prisma.post.count({
            where: {
                isActive: true,
                order: {
                    not: null,
                },
                ...filterOptions,
            },
        })

        if (!activeCount && activeCount !== 0) {
            return NextResponse.json({ error: 'Post ids not found' }, { status: 404 })
        }

        return NextResponse.json({ activeCount })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export type ResponseGetActivePostCountType = NextResponseData<typeof GET>
