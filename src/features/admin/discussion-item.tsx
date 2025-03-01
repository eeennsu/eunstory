import type { FC } from 'react'
import { mainPath } from '@/lib/route'
import { formatDateToFull } from '@/lib/utils'
import Link from 'next/link'
import { Badge } from '@/lib/ui/badge'
import { Comment } from '@/widgets/admin'

interface Props {
    comment: Comment
}

export const DiscussionItem: FC<Props> = ({ comment }) => {
    return (
        <div
            key={comment.id}
            className='flex flex-col gap-2 p-5 rounded-lg bg-gray-800'>
            <div className='flex justify-between items-center'>
                <Badge variant={comment.parentId ? 'outline' : 'default'}>{comment.parentId ? '답글' : '댓글'}</Badge>
                <span className='text-sm text-gray-400'>{formatDateToFull(comment.createdAt)}</span>
            </div>
            <p className='text-gray-300'>{comment.content}</p>
            <span className='text-sm text-gray-500'>작성자: {comment.author.name}</span>
            <p className='text-sm text-gray-500 flex gap-1'>
                포스트:
                {comment.post.isActive ? (
                    <Link
                        href={mainPath.post.detail(comment.post.id)}
                        className='text-teal-400 hover:underline'>
                        {comment.post.title}
                    </Link>
                ) : (
                    <span className='text-gray-700 line-through'>{comment.post.title}</span>
                )}
            </p>
            <div className='flex justify-start mt-3 text-xs items-center gap-3 text-gray-400 tracking-wide'>
                <span>수정여부: {comment?.updatedAt ? formatDateToFull(comment.updatedAt) : '없음'}</span> /
                <span>삭제여부: {comment.deletedAt ? formatDateToFull(comment.deletedAt) : '없음'}</span>
            </div>
        </div>
    )
}
