import { DeletePostButton, EditPostButton } from '@/features/post/detail/post'
import { getServerAuth } from '@/lib/auth'
import { Badge } from '@/lib/ui/badge'
import { formatDateToFull, textSanitizing } from '@/lib/utils'
import { Post } from '@prisma/client'
import type { FC } from 'react'

interface Props {
    post: Post
}

export const DetailPostWidget: FC<Props> = async ({ post }) => {
    const { isAdminAuthorized } = await getServerAuth()

    return (
        <article className='flex flex-col gap-6 text-white rounded-lg shadow-lg'>
            <section className='flex flex-col gap-4 border-b border-b-slate-700 pb-4'>
                <h1 className='text-5xl font-bold  text-slate-100 leading-tight'>{post?.title}</h1>

                <div className='flex flex-col gap-2'>
                    {!!post?.tags?.length && (
                        <div className='flex gap-2'>
                            {post?.tags.split(',').map((tag) => (
                                <Badge
                                    key={tag}
                                    variant={'tag'}
                                    className='px-3 py-1.5 rounded-xl'>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className='flex justify-between items-center h-8'>
                        <time className='text-sm text-gray-500'>{formatDateToFull(post.createdAt)}</time>

                        {isAdminAuthorized && (
                            <div className='flex gap-4'>
                                <EditPostButton id={post.id} />
                                <DeletePostButton id={post.id} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {post.thumbnail && (
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className='w-full max-w-3xl h-[400px] object-cover rounded-lg shadow-md'
                />
            )}

            {post?.content && (
                <section
                    className='tiptap-editor-content text-lg leading-relaxed tracking-wide text-gray-300'
                    dangerouslySetInnerHTML={{ __html: textSanitizing(post.content) }}
                />
            )}
        </article>
    )
}
