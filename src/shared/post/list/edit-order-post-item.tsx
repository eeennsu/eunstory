import { cn } from '@/lib/shadcn/shadcn-utils'
import { formatDateToFull } from '@/lib/utils'
import type { FC } from 'react'

interface Props {
    className?: string
    title: string
    createdAt: string | Date
}

export const EditOrderPostItem: FC<Props> = ({ className, title, createdAt }) => {
    return (
        <div className={cn('w-full bg-slate-700 p-4 rounded-lg shadow-sm', className)}>
            <h3 className='text-lg font-medium text-gray-100'>제목 : {title}</h3>
            <time className='text-gray-400 text-sm'>작성일 : {formatDateToFull(createdAt)}</time>
        </div>
    )
}
