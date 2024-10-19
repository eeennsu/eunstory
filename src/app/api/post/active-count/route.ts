import { NextResponseData } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

// 해당 API 경로를 항상 서버에서 실행하게 하며, 정적 렌더링 시도를 중지
export const dynamic = 'force-dynamic'

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams

        searchParams.forEach((value, key) => {
            console.log(key, value)
        })

        const filter = searchParams.get('filter')?.toString()

        const filterOptions = {
            ...(filter === 'last-three-months' && {
                createdAt: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 3)),
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
