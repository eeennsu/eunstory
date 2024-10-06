import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { Data } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { Arguments } from '@dnd-kit/sortable/dist/hooks/useSortable'
import { CSS } from '@dnd-kit/utilities'

export type CustomSortableItem = { id: any; sequence: number }

interface Props<T extends Data & CustomSortableItem> extends Arguments {
    item: T
    wrapperClassName?: string
    forceDragging?: boolean
    isOverlay?: boolean
    sequence?: ReactNode
    // removeButton?: ReactNode
    // removeItem?: (id: string) => void
}

export const Sortable = <T extends Data & CustomSortableItem>({
    children,
    item,
    wrapperClassName,
    forceDragging = false,
    isOverlay,
    sequence,
    // removeButton,
    // removeItem,
    ...props
}: PropsWithChildren<Props<T>>) => {
    const { setNodeRef, listeners, setActivatorNodeRef, attributes, isDragging, transform, transition } = useSortable({
        ...props,
    })

    const parentStyles: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'flex flex-col w-full h-fit gap-6 bg-white rounded-lg border border-gray-500',
                isDragging ? 'opacity-60 z-100 cursor-grabbing' : 'cursor-grab'
            )}
            style={parentStyles}>
            <div className={cn('w-full rounded-md overflow-hidden', wrapperClassName)}>
                {sequence}

                <div
                    ref={setActivatorNodeRef}
                    className={cn('flex-grow')}
                    {...attributes}
                    {...listeners}>
                    {children}
                </div>
            </div>
        </div>
    )
}
