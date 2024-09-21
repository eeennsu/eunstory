import { cn } from '@/lib/shadcn/shadcn-utils'
import { Button } from '@/lib/ui/button'
import { Data } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { Arguments } from '@dnd-kit/sortable/dist/hooks/useSortable'
import { XIcon } from 'lucide-react'
import type { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { CSS } from '@dnd-kit/utilities'

export type CustomSortableItem = { id: any; sequence: number }

interface Props<T extends Data & CustomSortableItem> extends Arguments {
    item: T
    isOverlay?: boolean
    overlayClassName?: string
    forceDragging?: boolean
    removeButton?: ReactNode
    removeItem?: (id: string) => void
}

export const Sortable = <T extends Data & CustomSortableItem>({
    children,
    item,
    isOverlay,
    overlayClassName,
    forceDragging = false,
    removeButton,
    removeItem,
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
        <article
            ref={setNodeRef}
            className={cn(
                'flex flex-col w-full h-fit gap-6 bg-white rounded-lg border border-gray-500',
                isDragging ? 'opacity-60 z-100 cursor-grabbing' : 'cursor-grab'
            )}
            style={parentStyles}>
            <div className='bg-secondary w-full rounded-md flex justify-between items-center gap-2 overflow-hidden'>
                <div className={cn('bg-black w-12')}>
                    <p className='w-full text-center text-secondary'>{item.sequence}</p>
                </div>

                <div
                    ref={setActivatorNodeRef}
                    className={cn('p-2 flex-grow')}
                    {...attributes}
                    {...listeners}>
                    {children}
                </div>

                {removeButton && (
                    <div className='w-12 h-full flex items-center'>
                        <Button
                            type='button'
                            size='icon-sm'
                            variant='outline'
                            onClick={() => removeItem?.(item.id)}>
                            <XIcon className='text-red-500' />
                        </Button>
                    </div>
                )}
            </div>
        </article>
    )
}
