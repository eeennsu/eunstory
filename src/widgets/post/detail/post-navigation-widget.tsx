import { serverRequestGetPostNavigation } from '@/entities/post'
import { PostNavigationItem } from '@/features/post/detail/navigation'
import type { FC } from 'react'

interface Props {
    id: string
    order: number
}

export const PostNavigationWidget: FC<Props> = async ({ id, order }) => {
    const responsePostNavigation = await serverRequestGetPostNavigation({ id, order })

    if ('error' in responsePostNavigation) {
        return null
    }

    return (
        <section className='flex justify-between max-w-5xl w-full mx-auto items-center gap-4 py-6'>
            {responsePostNavigation.prevPost ? (
                <PostNavigationItem
                    id={responsePostNavigation.prevPost.id}
                    title={responsePostNavigation.prevPost.title}
                    type='prev'
                />
            ) : (
                <div className='w-1/2' />
            )}
            {responsePostNavigation.nextPost ? (
                <PostNavigationItem
                    id={responsePostNavigation.nextPost.id}
                    title={responsePostNavigation.nextPost.title}
                    type='next'
                />
            ) : (
                <div className='w-1/2' />
            )}
        </section>
    )
}
