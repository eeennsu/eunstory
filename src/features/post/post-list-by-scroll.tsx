'use client'

import { requestGetPostList } from '@/entities/post'
import { useInfiniteScroll, useLoading } from '@/lib/hooks'
import { routePaths } from '@/lib/route'
import { Post } from '@prisma/client'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useState, useTransition } from 'react'

interface Props {
    initialPosts: Post[]
}

export const PostListByScroll: FC<Props> = ({ initialPosts }) => {
    const [curPage, setCurPage] = useState<number>(1)
    const [postList, setPostList] = useState<Post[]>([...initialPosts])
    const [hasMore, setHasMore] = useState<boolean>(true)
    const { isLoading, execute } = useLoading()
    const perPage = 5

    const { targetRef } = useInfiniteScroll({
        onIntersect: () => {
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
        <section className='flex gap-10 flex-col'>
            {postList.map((post) => (
                <Link
                    key={post.id}
                    href={routePaths.post.detail(post.id)}
                    className='hover:scale-110'>
                    <div className='border-2 border-black p-2 h-80 text-5xl'>{post.title}</div>
                </Link>
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
