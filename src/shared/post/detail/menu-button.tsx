'use client'

import { FC, PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/shadcn/shadcn-utils'

interface Props {
    onClick: () => void
    disabled?: boolean
}

export const MenuButton: FC<PropsWithChildren<Props>> = ({ onClick, disabled = false, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
            'flex items-center transition-all justify-center size-14 bg-gradient-to-br from-gray-800 to-gray-900 text-teal-400 rounded-full border-[3px] border-gray-400 shadow-lg group hover:shadow-xl duration-200',
            disabled ? 'opacity-0' : 'opacity-100'
        )}>
        <span className='group-hover:scale-125 transition-transform'>{children}</span>
    </button>
)
