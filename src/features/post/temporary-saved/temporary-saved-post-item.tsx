'use client'

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
            className='inline-flex flex-col w-full gap-3 rounded-xl px-4 py-2 bg-blue-100'>
            <h3 className='text-3xl font-semibold py-3'>{title}</h3>
            <p className='line-clamp-3'>{summary}</p>
            <div className='flex w-full justify-between items-center'>
                <time className='text-sm text-gray-500'>{formatBeforeTime(createdAt)}</time>
                <DeleteButton postId={id} />
            </div>
        </Link>
    )
}
