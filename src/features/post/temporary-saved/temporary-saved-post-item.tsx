import { formatBeforeTime } from '@/lib/utils'
import type { FC } from 'react'
import { DeleteButton } from './delete-button'
import Link from 'next/link'
import { mainPath } from '@/lib/route'

interface Props {
    id: string
    title: string
    summary: string
    createdAt: string
    onDelete: () => void
}

export const TemporarySavedPostItem: FC<Props> = ({ id, title, summary, createdAt, onDelete }) => {
    return (
        <div className='flex flex-col w-full gap-4 rounded-lg bg-gray-700/60 p-5 shadow-lg '>
            <Link
                href={mainPath.post.create(`id=${id}`)}
                className='text-xl font-semibold text-gray-100 underline-offset-4 hover:underline'>
                {title}
            </Link>
            <p className='text-gray-400 line-clamp-3'>{summary}</p>
            <div className='flex w-full justify-between items-center mt-4'>
                <time className='text-sm text-gray-500'>{formatBeforeTime(createdAt)}</time>
                <DeleteButton
                    postId={id}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}
