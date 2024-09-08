import { serverRequestGetSomePostList } from '@/entities/post'
import { PostListByScroll } from '@/features/post/post-list-by-scroll'
import type { FC } from 'react'

export const PostListBodyWidget: FC = async () => {
    const postListResponse = await serverRequestGetSomePostList({ curPage: 1, perPage: 5 })

    if ('error' in postListResponse) {
        throw postListResponse.error
    }

    return <PostListByScroll initialPosts={postListResponse?.posts} />
}
