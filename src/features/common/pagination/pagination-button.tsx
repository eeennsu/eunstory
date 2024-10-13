'use client'

import { cn } from '@/lib/shadcn/shadcn-utils'
import type { FC, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
    number: number
    isActive: boolean
}

export const PaginationButton: FC<Props> = ({ number, isActive, ...props }) => {
    return (
        <button
            className={cn(
                'w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all duration-200 outline-none',
                isActive
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-gray-800 text-teal-400 hover:bg-teal-600 hover:text-white'
            )}
            {...props}>
            {number}
        </button>
    )
}
