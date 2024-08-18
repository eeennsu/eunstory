'use client'

import { requestGetPostList } from '@/entities/post'
import { useInfiniteScroll } from '@/lib/hooks/use-infinite-scroll'
import { routePaths } from '@/lib/route'
import { Post } from '@prisma/client'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

export const PostListBodyWidget: FC = () => {
    const [curPage, setCurPage] = useState<number>(1)
    const [postList, setPostList] = useState<Post[]>([])
    const [hasMore, setHasMore] = useState<boolean>(true)
    const perPage = 3

    const { targetRef } = useInfiniteScroll({
        onIntersect: () => {
            setCurPage((prev) => prev + 1)
        },
        hasMore,
    })

    useEffect(() => {
        const fetch = async () => {
            const { totalCount, posts } = await requestGetPostList({
                curPage,
                perPage,
            })

            setHasMore(totalCount > perPage * curPage)
            setPostList((prev) => [...prev, ...posts])
        }

        fetch()
    }, [curPage])

    console.log('postList.length', postList.length)
    console.log('curPage', curPage)

    return (
        <section className='flex gap-10 flex-col'>
            {postList.map((post) => (
                <Link
                    key={post.id}
                    href={routePaths.post.detail(post.id)}
                    className='hover:scale-110'>
                    <div className='border-2 border-black p-2 h-80'>{post.title}</div>
                </Link>
            ))}
            {hasMore && (
                <div
                    className='h-1'
                    ref={targetRef}
                />
            )}
        </section>
    )
}
