'use client'

import { requestGetPostList } from '@/entities/post'
import { useInfiniteScroll, useLoading } from '@/lib/hooks'
import { Ellipsis } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { PostItem } from './post-item'
import { PostListItem } from '@/app/api/post/route'

interface Props {
    initialPosts: PostListItem[]
}

export const PostListByScroll: FC<Props> = ({ initialPosts }) => {
    const [curPage, setCurPage] = useState<number>(1)
    const [postList, setPostList] = useState<PostListItem[]>([...initialPosts])
    const [hasMore, setHasMore] = useState<boolean>(true)
    const { isLoading, execute } = useLoading()
    const perPage = 5

    const { targetRef } = useInfiniteScroll({
        onIntersect: () => {
            console.log('onIntersect!!')
            setCurPage((prev) => prev + 1)
        },
        hasMore,
    })

    useEffect(() => {
        if (curPage === 1) return

        execute(async () => {
            const response = await requestGetPostList({
                curPage,
                perPage,
                isPublished: true,
            })

            if ('totalCount' in response && 'posts' in response) {
                const { totalCount, posts } = response

                setHasMore(totalCount > perPage * curPage)
                setPostList((prev) => [...prev, ...posts])
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curPage])

    return (
        <section className='flex gap-10 flex-col w-full'>
            {postList.map((post) => (
                <PostItem
                    key={post.id}
                    id={post.id}
                    thumbnail={post.thumbnail}
                    title={post.title}
                    date={post.createdAt}
                    summary={post.summary}
                    tags={post.tags}
                />
            ))}
            {isLoading && (
                <div className='w-full flex justify-center'>
                    <Ellipsis className='size-8 animate-ping' />
                </div>
            )}
            {hasMore && (
                <div
                    className='h-4'
                    ref={targetRef}
                />
            )}
        </section>
    )
}
