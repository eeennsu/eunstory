'use client'

import { requestGetPostNavigation } from '@/entities/post'
import { PostNavigationItem } from '@/features/post/detail/navigation'
import { useAsync } from '@/lib/hooks'
import { useState, type FC } from 'react'

interface Props {
    id: string
    order: number
}

export const PostNavigationWidget: FC<Props> = ({ id, order }) => {
    const [postNav, setPostNav] = useState<{ prevPost: any; nextPost: any } | null>(null)

    useAsync(async () => {
        const responsePostNavigation = await requestGetPostNavigation({ id, order })

        if ('error' in responsePostNavigation) {
            return { prevPost: null, nextPost: null }
        }

        setPostNav(responsePostNavigation)
    }, [])

    return (
        <section className='flex justify-between max-w-5xl w-full mx-auto items-center gap-4 py-6'>
            {postNav?.prevPost ? (
                <PostNavigationItem
                    id={postNav?.prevPost.id}
                    title={postNav?.prevPost.title}
                    type='prev'
                />
            ) : (
                <div className='w-1/2' />
            )}
            {postNav?.nextPost ? (
                <PostNavigationItem
                    id={postNav?.nextPost.id}
                    title={postNav?.nextPost.title}
                    type='next'
                />
            ) : (
                <div className='w-1/2' />
            )}
        </section>
    )
}
