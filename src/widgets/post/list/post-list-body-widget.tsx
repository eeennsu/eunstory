import { serverRequestGetDefaultPostList } from '@/entities/post'
import { PostListByScroll } from '@/features/post/post-list-by-scroll'
import { routePaths } from '@/lib/route'
import { redirect } from 'next/navigation'
import type { FC } from 'react'

export const PostListBodyWidget: FC = async () => {
    const response = await serverRequestGetDefaultPostList()

    if ('error' in response) {
        redirect(routePaths.home())
    }

    return <PostListByScroll initialPosts={response.posts} />
}

export const revalidate = 600
