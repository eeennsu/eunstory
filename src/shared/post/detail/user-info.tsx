import { PostComment } from '@/entities/post-comment/post-comment.types'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { formatBeforeTime } from '@/lib/utils'
import { Comment } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
    author: PostComment['author']
    createdAt: Comment['createdAt']
    updatedAt?: Comment['updatedAt']
}

export const UserInfo: FC<Props> = ({ author, createdAt, updatedAt }) => {
    const Comp = author.url ? Link : 'div'

    return (
        <Comp
            href={author?.url || ''}
            target='_blank'
            className='inline-flex gap-3 w-fit items-center group rounded-lg'>
            <Image
                src={author.isAdmin ? '/images/eunstory-logo-icon.png' : author?.image || ''}
                alt={author?.name}
                className='rounded-full object-contain'
                width={40}
                height={40}
            />

            <div className='flex flex-col gap-1'>
                <span className={cn(author.url && 'group-hover:underline underline-offset-2')}>{author?.name}</span>

                <div className='flex gap-2'>
                    <time>{formatBeforeTime(createdAt)}</time>
                    {updatedAt && <span>(수정됨)</span>}
                </div>
            </div>
        </Comp>
    )
}
