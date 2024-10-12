import { cn } from '@/lib/shadcn/shadcn-utils'
import { Ellipsis } from 'lucide-react'
import type { FC } from 'react'

interface Props {
    className?: string
}

export const EllipsisLoading: FC<Props> = ({ className }) => {
    return (
        <div className={cn('w-full flex justify-center items-center', className)}>
            <Ellipsis className='size-8 animate-ping' />
        </div>
    )
}
