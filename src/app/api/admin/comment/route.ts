import { getServerAuth } from '@/lib/auth'
import { NextResponseData } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../prisma/prisma-client'

export const GET = async (request: NextRequest) => {
    const { isAdminAuthorized } = await getServerAuth()

    if (!isAdminAuthorized) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams

    const curPage = Number(searchParams.get('curPage')) || 1
    const perPage = Number(searchParams.get('perPage')) || 10

    const totalCount = await prisma.comment.count({
        where: {
            author: {
                isAdmin: false,
            },
        },
    })
    const totalPage = Math.ceil(totalCount / perPage) || 1

    const comments = await prisma.comment.findMany({
        skip: perPage * (curPage - 1),
        take: perPage,
        where: {
            author: {
                isAdmin: false,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            parentId: true,
            deletedAt: true,
            content: true,
            post: {
                select: {
                    id: true,
                    isActive: true,
                    title: true,
                },
            },
            author: {
                select: {
                    name: true,
                    url: true,
                },
            },
        },
    })

    if (!comments) {
        return NextResponse.json({ error: 'Comments not found' }, { status: 404 })
    }

    return NextResponse.json({ comments, totalPage })
}

export type ResponseGetAllCommentListType = NextResponseData<typeof GET>
