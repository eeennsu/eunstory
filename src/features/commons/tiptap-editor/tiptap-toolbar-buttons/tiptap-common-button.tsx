import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/shadcn/shadcn-utils'

interface Props extends HTMLAttributes<HTMLButtonElement> {
    icon: ReactNode
    isActive?: boolean
}

export const TiptapCommonButton: FC<PropsWithChildren<Props>> = ({ icon, className, isActive, children, ...props }) => {
    return (
        <button
            className={cn(
                'size-9 rounded-lg p-[6px] flex items-center justify-center transition-all duration-300 ease-out hover:bg-gray-100',
                className,
                isActive && 'bg-gray-100'
            )}
            type='button'
            {...props}>
            <div className='inline-flex items-center justify-center'>
                {children}
                {icon}
            </div>
        </button>
    )
}
