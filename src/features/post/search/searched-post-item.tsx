import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SearchedPost } from '@/app/api/post/search/route'
import { formatBeforeTime } from '@/lib/utils'
import { Badge } from '@/lib/ui/badge'

interface Props {
    post: SearchedPost
}

export const SearchedPostItem: FC<Props> = ({ post }) => {
    return (
        <Link
            href={`/post/${post.id}`}
            className='flex flex-col gap-4 p-5 border border-gray-600 rounded-lg group bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300'>
            <figure className='relative h-36 w-full rounded-md overflow-hidden'>
                <Image
                    src={post.thumbnail || '/images/eunstory-logo.png'}
                    alt={post.title}
                    layout='fill'
                    className='object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-300'
                />
            </figure>
            <section className='flex flex-col gap-4 w-full'>
                <h2 className='text-lg font-medium text-white truncate w-full group-hover:text-indigo-300'>
                    {post.title}
                </h2>
                <div className='flex flex-col gap-1.5'>
                    <div className='flex flex-wrap gap-2'>
                        {post.tags?.split(',').map((tag) => (
                            <Badge
                                key={tag}
                                variant={'tag'}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <time className='text-xs text-gray-400'>{formatBeforeTime(post.createdAt)}</time>
                </div>
            </section>
        </Link>
    )
}
