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
    const profileImage = author.isAdmin
        ? '/images/eunstory-logo-icon.png'
        : author?.image || '/images/default-profile.png' // 기본 프로필 이미지 추가

    const UserInfoContent = (
        <div
            className={cn(
                'inline-flex gap-3 w-fit items-center group rounded-lg',
                !author.url && 'hover:cursor-default'
            )}>
            <Image
                src={profileImage}
                alt={author?.name || '사용자'}
                className='rounded-full object-contain'
                width={40}
                height={40}
            />

            <div className='flex flex-col gap-1'>
                <span className={cn(author.url && 'group-hover:underline underline-offset-2')}>
                    {author?.name || '익명'}
                </span>

                <div className='flex gap-2'>
                    <time>{formatBeforeTime(createdAt)}</time>
                    {updatedAt && <span>(수정됨)</span>}
                </div>
            </div>
        </div>
    )

    return author.url ? (
        <Link
            href={author.url}
            target='_blank'>
            {UserInfoContent}
        </Link>
    ) : (
        UserInfoContent
    )
}
