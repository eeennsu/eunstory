'use server'

import prisma from '@/lib/prisma/prisma-client'
import { getServerAuth } from '@/lib/utils'
import { Post } from '@prisma/client'

export const requestCreatePost = async ({ ...post }: Partial<Post>) => {
    try {
        const { isAdminAuthed } = await getServerAuth()

        if (!isAdminAuthed) {
            throw new Error(`Unauthorized`)
        }

        const { title, content, authorId, tags } = post

        if (!title || !content || !authorId) {
            return
        }

        const createdPost = await prisma.post.create({
            data: {
                title,
                content,
                tags,
                authorId,
            },
        })

        if (!createdPost) {
            throw new Error('Failed to create post')
        }

        return { createdPost }
    } catch (error) {
        throw error
    }
}

export const requestGetPostList = async ({ perPage = 5, curPage = 1 }: { perPage?: number; curPage?: number }) => {
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
            throw new Error(`Posts not found`)
        }

        return { posts }
    } catch (error) {
        throw error
    }
}

export const requestGetDetailPost = async ({ id }: { id: string }) => {
    try {
        if (!id) {
            throw new Error(`Post ID is required`)
        }

        const post = await prisma.post.findUnique({
            where: {
                id,
            },
        })

        if (!post) {
            throw new Error(`Post not found`)
        }

        return { post }
    } catch (error) {
        throw error
    }
}

export const requestEditPost = async ({ id, ...post }: Partial<Post>) => {
    try {
        if (!id) {
            throw new Error(`Post ID is required`)
        }

        const editedPost = await prisma.post.update({
            where: {
                id,
            },
            data: {
                ...post,
            },
        })

        if (!editedPost) {
            throw new Error(`Failed to edit post`)
        }

        return { editedPost }
    } catch (error) {
        throw error
    }
}

export const requestDeletePost = async ({ id }: { id: string }) => {
    try {
        if (!id) {
            throw new Error(`Post ID is required`)
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id,
            },
        })

        if (!deletedPost) {
            throw new Error(`Failed to delete post`)
        }

        return { deletedPost }
    } catch (error) {
        throw error
    }
}
