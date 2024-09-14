'use client'

import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Post } from '@prisma/client'
import { useState, type FC } from 'react'
import dynamic from 'next/dynamic'
import { CustomSortableItem, Sortable } from '@/features/common/dnd/sortable'
import { DragEndEvent } from '@dnd-kit/core'
import { EditPostListHeader } from '@/features/post/edit'

interface Props {
    allPosts: Post[]
    totalCount: number
}

export type DraggablePost = Post & CustomSortableItem

/* 
    DnDProvider를 dynamic을 사용하여 import 하는 이유
    --> 브라우저 환경에서만 작동하는 DOM 요소를 사용하기 때문에, SSR 환경에서는 제대로 작동하지 않을 수 있음
*/

const DndProviderWithNoSSR = dynamic(() => import('@/features/common/dnd').then((md) => md.DndProvider), { ssr: false })

export const EditPostOrderWidget: FC<Props> = ({ allPosts, totalCount }) => {
    const [mode, setMode] = useState<'edit' | 'view'>('view')
    const [sortablePosts, setSortablePosts] = useState<DraggablePost[]>(
        allPosts.map((post, i) => ({ ...post, sequence: allPosts.length - i }))
    )

    const removeItem = (id: string) => {
        setSortablePosts((prev) =>
            prev.filter((post) => post.id !== id).map((post, i) => ({ ...post, sequence: sortablePosts.length - i }))
        )
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!active || !over) {
            return
        }

        const activeIndex = sortablePosts.findIndex((post) => post.sequence === active?.id)
        const overIndex = sortablePosts.findIndex((post) => post.sequence === over?.id)

        if (activeIndex !== overIndex) {
            setSortablePosts(
                arrayMove(sortablePosts, activeIndex, overIndex).map((post, i) => ({
                    ...post,
                    sequence: sortablePosts.length - i,
                }))
            )
        }
    }

    return (
        <section className='flex flex-col gap-6 '>
            <EditPostListHeader
                mode={mode}
                setMode={setMode}
                totalCount={totalCount}
                sortablePosts={sortablePosts}
            />
            <section className='flex flex-col gap-2'>
                {mode === 'view' ? (
                    <div className='flex flex-col gap-6'>
                        {sortablePosts.map((post) => (
                            <div
                                key={post.id}
                                className='w-full bg-slate-200 p-2'>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <DndProviderWithNoSSR onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={sortablePosts.map((post) => post.sequence)}
                            strategy={verticalListSortingStrategy}>
                            {sortablePosts.map((post) => (
                                <Sortable
                                    key={post.id}
                                    item={post}
                                    id={post.sequence}
                                    removeItem={removeItem}>
                                    <div>
                                        <h3>{post.title}</h3>
                                        <p>{post.content}</p>
                                    </div>
                                </Sortable>
                            ))}
                        </SortableContext>
                    </DndProviderWithNoSSR>
                )}
            </section>
        </section>
    )
}
