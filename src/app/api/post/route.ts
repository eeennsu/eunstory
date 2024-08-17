// import type { Post } from '@prisma/client'
// import prisma from '@/lib/prisma/prisma-client'
// import { NextRequest, NextResponse } from 'next/server'
// import { getServerAuth } from '@/lib/utils'

// // get post list
// export const GET = async (request: Request) => {
//     const { isAdminAuthed } = await getServerAuth()

//     const searchParams = new URL(request.url).searchParams
//     const perPage = Number(searchParams.get('perPage')) || 5
//     const curPage = Number(searchParams.get('curPage')) || 1

//     try {
//         const posts = (await prisma.post.findMany({
//             where: {
//                 published: true,
//             },
//             skip: perPage * (curPage - 1),
//             take: perPage,
//             orderBy: {
//                 createdAt: 'desc',
//             },
//         })) as Post[]

//         if (!posts) {
//             return NextResponse.json({ error: 'Posts not found' }, { status: 404 })
//         }

//         return NextResponse.json({ posts })
//     } catch (error) {
//         return NextResponse.json({ error }, { status: 500 })
//     }
// }

// // create post
// export const POST = async (request: NextRequest) => {
//     try {
//         const { isAdminAuthed } = await getServerAuth()

//         if (!isAdminAuthed) {
//             return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//         }

//         const body = await request.json()
//         const { title, content, tags = [], authorId } = body

//         if (!title || !content || !authorId) {
//             return NextResponse.json({ error: 'Title, content, and authorId are required' }, { status: 400 })
//         }

//         const post = await prisma.post.create({
//             data: {
//                 title,
//                 content,
//                 tags,
//                 authorId,
//             },
//         })

//         if (!post) {
//             return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
//         }

//         return NextResponse.json({ post }, { status: 201 })
//     } catch (error) {
//         return NextResponse.json({ error }, { status: 500 })
//     }
// }
