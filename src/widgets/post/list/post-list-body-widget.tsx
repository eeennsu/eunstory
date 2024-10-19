'use client'

import { PostListItem } from '@/app/api/post/route'
import { requestGetPostList, serverRequestGetSomePostList } from '@/entities/post'
import { PostListByScroll } from '@/features/post/list/post-list-by-scroll'
import { useAsync } from '@/lib/hooks'
import { useEffect, useState, type FC } from 'react'

export const PostListBodyWidget: FC = async () => {
    const [initialPosts, setInitialPosts] = useState<PostListItem[]>([])

    const { isLoading } = useAsync(async () => {
        const responsePostList = await requestGetPostList({ curPage: 1, perPage: 5, isPublished: true })
        if ('error' in responsePostList) {
            throw responsePostList.error
        }

        setInitialPosts(responsePostList.posts)
    }, [])

    // const responsePostList = await serverRequestGetSomePostList({ curPage: 1, perPage: 5, isPublished: true })
    // if ('error' in responsePostList) {
    //     throw responsePostList.error
    // }

    return !isLoading && <PostListByScroll initialPosts={initialPosts} />
}
