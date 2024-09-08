import { DragOverlay, useDraggable, UseDraggableArguments } from '@dnd-kit/core'
import type { FC, PropsWithChildren } from 'react'
import { cn } from '@/lib/shadcn/shadcn-utils'

interface Props extends UseDraggableArguments {
    className?: string
}

export const Draggable: FC<PropsWithChildren<Props>> = ({ children, className, ...draggableProps }) => {
    const { attributes, listeners, setNodeRef, active } = useDraggable({
        attributes: {
            role: 'button',
        },
        ...draggableProps,
    })

    const isActive = active?.id === draggableProps.id

    return (
        <div className='relative'>
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className={cn(
                    'rounded-[8px] relative cursor-grab transition-opacity',
                    active ? (isActive ? 'opacity-100' : 'opacity-50') : 'opacity-100',
                    className
                )}>
                {isActive && (
                    <DragOverlay
                        className='rounded-[8px] shadow-lg cursor-grab'
                        zIndex={1000}>
                        {children}
                    </DragOverlay>
                )}
                {children}
            </div>
        </div>
    )
}
