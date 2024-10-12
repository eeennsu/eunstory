'use client'

import type { FC } from 'react'
import { PaginationButton } from './pagination-button'
import {
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    Pagination as ShadcnPagination,
} from '@/lib/ui/pagination'
import { cn } from '@/lib/shadcn/shadcn-utils'

interface Props {
    curPage: number
    totalPage: number
    onPageChange: (page: number) => void
    maxVisible?: number
}

export const Pagination: FC<Props> = ({ curPage, totalPage, onPageChange, maxVisible = 5 }) => {
    const blockStart = Math.floor((curPage - 1) / maxVisible) * maxVisible + 1
    const blockEnd = Math.min(blockStart + maxVisible - 1, totalPage)

    const showPages = Array.from({ length: blockEnd - blockStart + 1 }, (_, i) => blockStart + i)

    const prevBlockStart = Math.max(1, blockStart - maxVisible)
    const nextBlockStart = Math.min(blockStart + maxVisible, totalPage)

    const isFirstBlock = blockStart === 1
    const isLastBlock = blockEnd === totalPage

    return (
        <ShadcnPagination>
            <PaginationContent className='gap-2'>
                <PaginationItem>
                    <PaginationPrevious
                        className={cn(
                            'hover:bg-transparent',
                            isFirstBlock ? 'opacity-35' : 'hover:bg-gray-700 cursor-pointer'
                        )}
                        onClick={() => !isFirstBlock && onPageChange(prevBlockStart)}
                    />
                </PaginationItem>

                {showPages.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationButton
                            number={page}
                            onClick={() => onPageChange(page)}
                            isActive={page === curPage}
                        />
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        className={cn(
                            'hover:bg-transparent',
                            isLastBlock ? 'opacity-35' : 'hover:bg-gray-700 cursor-pointer'
                        )}
                        onClick={() => !isLastBlock && onPageChange(nextBlockStart)}
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    )
}
