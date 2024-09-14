import type { FC, PropsWithChildren } from 'react'
import {
    closestCenter,
    DndContext,
    DndContextProps,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'

interface Props extends Omit<DndContextProps, 'sensors'> {}

// Draggable 과 Droppable 컴포넌트는 DNDContext 컴포넌트를 부모로 가지고 있어야 합니다. (context APU 를 사용하는 provider 역할)
export const DndProvider: FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, { activationConstraint: { tolerance: 5, distance: 5 } })
    )

    return (
        <DndContext
            {...props}
            sensors={sensors}
            collisionDetection={closestCenter}>
            {children}
        </DndContext>
    )
}
