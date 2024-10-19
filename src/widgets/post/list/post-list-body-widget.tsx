'use client'

import { serverRequestGetSomePostList } from '@/entities/post'
import { PostListByScroll } from '@/features/post/list/post-list-by-scroll'
import type { FC } from 'react'

export const PostListBodyWidget: FC = async () => {
    const responsePostList = await serverRequestGetSomePostList({ curPage: 1, perPage: 5, isPublished: true })

    if ('error' in responsePostList) {
        console.log('error in responsePostList', responsePostList.error)
        return null
    }

    return <PostListByScroll initialPosts={responsePostList?.posts} />
}
