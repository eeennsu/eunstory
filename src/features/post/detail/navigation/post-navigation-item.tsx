import { mainPath } from '@/lib/route'
import { Post } from '@prisma/client'
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { cn } from '@/lib/shadcn/shadcn-utils'

interface Props {
    id: Post['id']
    title: Post['title']
    type: 'prev' | 'next'
}

export const PostNavigationItem: FC<Props> = ({ id, title, type }) => {
    return (
        <Link
            href={mainPath.post.detail(id)}
            className={cn(
                'flex items-center flex-1 gap-4 p-4 rounded-lg transition-all duration-300 bg-transparent hover:bg-gray-700/30',
                type === 'next' ? 'text-right justify-end' : 'text-left'
            )}>
            {type === 'prev' && <CircleChevronLeft className='text-gray-400 h-6 w-6' />}
            <div className='flex flex-col'>
                <h5 className='text-sm text-gray-500/90'>{type === 'next' ? '다음' : '이전ARF'} 포스트</h5>
                <p className='text-lg text-gray-200 font-semibold truncate max-w-[424px]'>{title}</p>
            </div>
            {type === 'next' && <CircleChevronRight className='text-gray-400 h-6 w-6' />}
        </Link>
    )
}
