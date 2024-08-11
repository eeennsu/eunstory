import { client } from '@/lib/axios/client-instance'
import { Post } from '@prisma/client'

export const requestCreatePost = async (body: Partial<Post>) => {
    const response = await client.post<{ post: Post }>('/api/post', body)

    return response
}
