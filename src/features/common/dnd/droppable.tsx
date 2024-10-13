import { cn } from '@/lib/shadcn/shadcn-utils'
import { useDroppable, UseDroppableArguments } from '@dnd-kit/core'
import type { FC, PropsWithChildren } from 'react'

interface Props extends UseDroppableArguments {
    className?: string
    disableDefaultStyle?: boolean
}

export const Droppable: FC<PropsWithChildren<Props>> = ({
    children,
    id,
    className,
    data,
    disabled,
    resizeObserverConfig,
    disableDefaultStyle,
}) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
        data,
        disabled,
        resizeObserverConfig,
    })

    return (
        <div
            className={cn(!disableDefaultStyle && isOver && 'shadow-2xl', className)}
            ref={setNodeRef}>
            {children}
        </div>
    )
}
