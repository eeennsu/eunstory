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
}

export const TemporarySavedPostItem: FC<Props> = ({ id, title, summary, createdAt }) => {
    return (
        <Link
            href={mainPath.post.create(`id=${id}`)}
            className='flex flex-col w-full gap-4 rounded-lg bg-gray-800 p-5 shadow-lg hover:bg-gray-700 transition-all duration-300'>
            <h3 className='text-xl font-semibold text-gray-100'>{title}</h3>
            <p className='text-gray-400 line-clamp-3'>{summary}</p>
            <div className='flex w-full justify-between items-center mt-4'>
                <time className='text-sm text-gray-500'>{formatBeforeTime(createdAt)}</time>
                <DeleteButton postId={id} />
            </div>
        </Link>
    )
}
