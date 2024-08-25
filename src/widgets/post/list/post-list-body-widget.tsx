import { requestGetDefaultPostList } from '@/entities/post'
import { PostListByScroll } from '@/features/post/post-list-by-scroll'
import type { FC } from 'react'

export const PostListBodyWidget: FC = async () => {
    const response = await requestGetDefaultPostList()
 
    if (!response.posts) {
        throw new Error('Posts not found')
    }

    return <PostListByScroll initialPosts={response.posts} />
}

export const revalidate = 0
