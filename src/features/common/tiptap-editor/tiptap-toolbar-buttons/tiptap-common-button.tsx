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
                'size-9 rounded-lg p-[6px] flex items-center justify-center transition-all duration-300 ease-out bg-slate-700/80 hover:bg-slate-600',
                className,
                isActive && 'bg-slate-200/hover:bg-slate-200/60'
            )}
            type='button'
            {...props}>
            <div className='inline-flex items-center justify-center text-gray-200'>
                {children}
                {icon}
            </div>
        </button>
    )
}
