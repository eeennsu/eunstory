import { mainPath } from '@/lib/route'
import { Badge } from '@/lib/ui/badge'
import { formatDateToYMD } from '@/lib/utils'
import { Post } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, type FC } from 'react'

interface Props {
    id: Post['id']
    thumbnail: Post['thumbnail']
    title: Post['title']
    summary: Post['summary']
    date: string | Date
    tags: Post['tags']
}

export const PostItem: FC<Props> = ({ id, title, thumbnail, date, summary, tags }) => {
    return (
        <Link
            key={id}
            href={mainPath.post.detail(id)}
            className='group grid grid-cols-4 p-6 bg-gray-800 brightness-110 transition-all duration-300 rounded-xl shadow-lg'>
            <section className='flex flex-col gap-5 col-span-3 justify-between'>
                <div className='flex flex-col gap-2.5 flex-grow'>
                    <h2 className='text-2xl font-bold text-white line-clamp-1'>{title}</h2>
                    <p className='text-gray-500 text-base line-clamp-3 flex-grow'>{summary}</p>
                </div>

                <div className='flex items-center gap-3.5 text-sm text-gray-500'>
                    <time>{formatDateToYMD(date)}</time>

                    {tags && !!tags.length && (
                        <Fragment>
                            <span className='text-[10px]'>|</span>
                            <div className='flex gap-3'>
                                {tags?.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={'tag'}>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </Fragment>
                    )}
                </div>
            </section>

            <section className='flex justify-end'>
                <figure className='relative max-w-[160px] w-full col-span-1 h-[160px] rounded-lg overflow-hidden shadow-md'>
                    <Image
                        src={thumbnail || '/images/eunstory-logo.png'}
                        alt={title}
                        className='w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110'
                        fill
                    />
                </figure>
            </section>
        </Link>
    )
}
