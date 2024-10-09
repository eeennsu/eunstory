import { PostComment } from '@/entities/post-comment/post-comment.types'
import { Avatar, AvatarImage } from '@/lib/ui/avatar'
import { formatBeforeTime } from '@/lib/utils'
import { defaultUserIcon } from '@/shared/constants'
import { Comment } from '@prisma/client'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
    author: PostComment['author']
    createdAt: Comment['createdAt']
    updatedAt?: Comment['updatedAt']
}

export const UserInfo: FC<Props> = ({ author, createdAt, updatedAt }) => {
    return (
        <Link
            href={author.url || '#'}
            target='_blank'
            className='inline-flex gap-3 w-fit items-center cursor-pointer group rounded-lg'>
            <Avatar>
                <AvatarImage
                    src={author?.image || defaultUserIcon}
                    alt={author?.name}
                />
            </Avatar>
            <div className='flex flex-col gap-1'>
                <span className='group-hover:underline underline-offset-2'>{author?.name}</span>
                <div className='flex gap-2'>
                    <time>{formatBeforeTime(createdAt)}</time>
                    {updatedAt && <span>(수정됨)</span>}
                </div>
            </div>
        </Link>
    )
}
