import { getServerAuth } from '@/lib/auth'
import { NextResponseData } from '@/lib/fetch'
import prisma from '@/lib/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const { isAdminAuthorized } = await getServerAuth()

    if (!isAdminAuthorized) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 401 })
    }

    const params = request.nextUrl.searchParams

    const curPage = Number(params.get('curPage')) || 1
    const perPage = Number(params.get('perPage')) || 10

    const comments = await prisma.comment.findMany({
        skip: perPage * (curPage - 1),
        take: perPage,
        select: {
            id: true,
            isActive: true,
            parentId: true,
            content: true,
        },
    })

    if (!comments) {
        return NextResponse.json({ error: 'Comments not found' }, { status: 404 })
    }

    return NextResponse.json({ comments })
}

export type ResponseGetAllCommentListType = NextResponseData<typeof GET>
