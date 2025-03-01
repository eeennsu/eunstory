import type { FC } from 'react'
import { PostAuthorButtons } from '@/features/post/detail/post'
import { Badge } from '@/lib/ui/badge'
import { formatDateToYMD, textSanitizing } from '@/lib/utils'
import { Post } from '@prisma/client'

interface Props {
    post: Post
}

export const DetailPostWidget: FC<Props> = async ({ post }) => {
    return (
        <article className='flex flex-col gap-7 text-white rounded-lg pb-14'>
            <section className='flex flex-col gap-4 border-b border-b-slate-700 pb-7'>
                <h1 className='text-3xl font-bold text-slate-100 leading-tight'>{post?.title}</h1>

                <div className='flex flex-col gap-2'>
                    {!!post?.tags?.length && (
                        <div className='flex gap-2'>
                            {post?.tags.map((tag) => (
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
                        <time className='text-sm text-gray-500'>{formatDateToYMD(post.createdAt)}</time>

                        <PostAuthorButtons postId={post.id} />
                    </div>
                </div>
            </section>

            {post.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className='w-auto h-[360px] object-contain rounded-md mx-auto'
                />
            )}

            {post?.content && (
                <section
                    className='tiptap-editor-content '
                    dangerouslySetInnerHTML={{ __html: textSanitizing(post.content) }}
                />
            )}
        </article>
    )
}
