import { DeletePostButton, EditPostButton } from '@/features/post/detail'
import { getDateWithTime, textSanitizing } from '@/lib/utils'
import { Post } from '@prisma/client'
import type { FC } from 'react'

interface Props {
    post: Post
}

export const DetailPostWidget: FC<Props> = ({ post }) => {
    return (
        <section className='flex flex-col items-center'>
            <h1 className='text-5xl font-bold'>{post?.title}</h1>
            {post?.content && (
                <section
                    className='mt-4'
                    dangerouslySetInnerHTML={{ __html: textSanitizing(post.content) }}
                />
            )}
            {post?.createdAt && <div>{getDateWithTime(post.createdAt)}</div>}

            <section className='flex gap-4'>
                {post?.id && <EditPostButton id={post.id} />}
                {post?.id && <DeletePostButton id={post.id} />}
            </section>
        </section>
    )
}
