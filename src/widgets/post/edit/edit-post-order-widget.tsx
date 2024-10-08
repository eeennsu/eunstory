'use client'

import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Post } from '@prisma/client'
import { useState, type FC } from 'react'
import dynamic from 'next/dynamic'
import { CustomSortableItem, Sortable } from '@/features/common/dnd/sortable'
import { DragEndEvent } from '@dnd-kit/core'
import { EditPostOrderHead } from '@/features/post/edit'
import { EditOrderPostItem } from '@/shared/post/list'
import { PostListItem } from '@/app/api/post/route'

interface Props {
    allPosts: PostListItem[]
    totalCount: number
}

export type DraggablePost = PostListItem & CustomSortableItem

/* 
    DnDProvider를 dynamic을 사용하여 import 하는 이유
    --> 브라우저 환경에서만 작동하는 DOM 요소를 사용하기 때문에, SSR 환경에서는 제대로 작동하지 않을 수 있음
*/

const DndProvider = dynamic(() => import('@/features/common/dnd').then((md) => md.DndProvider), { ssr: false })

export const EditPostOrderWidget: FC<Props> = ({ allPosts, totalCount }) => {
    const [mode, setMode] = useState<'edit' | 'view'>('view')
    const [sortablePosts, setSortablePosts] = useState<DraggablePost[]>(
        allPosts.map((post, i) => ({ ...post, sequence: allPosts.length - i }))
    )

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
        <div className='flex flex-col gap-6'>
            <EditPostOrderHead
                mode={mode}
                setMode={setMode}
                totalCount={totalCount}
                sortablePosts={sortablePosts}
            />
            <section className='flex flex-col gap-4 mt-4'>
                {mode === 'view' ? (
                    <div className='flex flex-col gap-6'>
                        {sortablePosts?.map((post) => (
                            <EditOrderPostItem
                                key={post.id}
                                title={post.title}
                                createdAt={post.createdAt}
                            />
                        ))}
                    </div>
                ) : (
                    <DndProvider onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={sortablePosts.map((post) => post.sequence)}
                            strategy={verticalListSortingStrategy}>
                            {sortablePosts.map((post) => (
                                <Sortable
                                    key={post.id}
                                    item={post}
                                    id={post.sequence}
                                    wrapperClassName='bg-gray-900 py-0 flex items-center justify-between'
                                    sequence={
                                        <div className='flex items-center justify-center px-3'>
                                            <p className='text-gray-200'>{post.sequence}</p>
                                        </div>
                                    }>
                                    <EditOrderPostItem
                                        className='cursor-move rounded-none'
                                        title={post.title}
                                        createdAt={post.createdAt}
                                    />
                                </Sortable>
                            ))}
                        </SortableContext>
                    </DndProvider>
                )}
            </section>
        </div>
    )
}
