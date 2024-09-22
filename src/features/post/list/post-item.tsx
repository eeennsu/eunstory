import { routePaths } from '@/lib/route'
import { Post } from '@prisma/client'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
    id: Post['id']
    thumbnail: Post['thumbnail']
    title: Post['title']
    summary: Post['summary']
}

export const PostItem: FC<Props> = ({ id, thumbnail, title, summary }) => {
    return (
        <Link
            key={id}
            href={routePaths.post.detail(id)}
            className='flex justify-between items-center gap-4 h-40 border-2 hover:shadow-xl border-black p-2 shadow-md'
            prefetch={false}>
            <figure className='relative h-[140px] max-w-[140px] w-full'>
                <img
                    src={thumbnail || '/images/eunstory-logo.png'}
                    alt={title}
                    className='size-full object-cover rounded-md'
                />
            </figure>
            <div className='flex flex-col gap-2 flex-1'>
                <div className='text-5xl p-2'>{title}</div>
                <p>{summary}</p>
            </div>
        </Link>
    )
}
