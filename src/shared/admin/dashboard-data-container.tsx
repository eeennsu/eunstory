import { cn } from '@/lib/shadcn/shadcn-utils'
import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {}

export const DashboardDataContainer: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
    return (
        <section
            className={cn(
                'flex flex-col gap-5 p-6 rounded-2xl bg-gray-800 shadow-xl shadow-gray-900 border border-gray-700',
                className
            )}
            {...props}>
            {children}
        </section>
    )
}
