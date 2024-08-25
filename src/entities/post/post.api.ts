import { ResponseGetPostListType } from '@/app/api/post/route'
import { Post } from '@prisma/client'

// server
export const requestGetDefaultPostList = async () => {
    const res = await fetch('http://localhost:3000/api/post?curPage=1&perPage=5', { cache: 'no-store' })

    return res.json()
}

// client
export const requestGetPostList = async ({
    tag,
    curPage = 1,
    perPage = 5,
}: {
    curPage: number
    perPage: number
    tag?: string
}) => {
    const params = new URLSearchParams()
    tag && params.append('tag', tag)
    params.append('curPage', curPage.toString())
    params.append('perPage', perPage.toString())

    const res = await fetch(`/api/post?${params.toString()}`, { cache: 'no-store' })
    return res.json()
}

export const requestGetDetailPost = async ({ id }: { id: string }) => {
    if (!id) {
        throw new Error(`Post ID is required`)
    }

    const res = await fetch(`http://localhost:3000/api/post/${id}`)

    return res.json()
}

// client
export const requestCreatePost = async ({ post }: { post: Partial<Post> }) => {
    const res = await fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })

    return res.json()
}

// client
export const requestDeletePost = async ({ id }: { id: string }) => {
    const res = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
    })

    return res.json()
}
