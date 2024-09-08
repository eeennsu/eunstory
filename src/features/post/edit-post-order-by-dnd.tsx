'use client'

import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Post } from '@prisma/client'
import { use, useState, type FC } from 'react'
import dynamic from 'next/dynamic'
import { CustomSortableItem, Sortable } from '@/features/common/dnd/sortable'
import { DragEndEvent } from '@dnd-kit/core'
import { Button } from '@/lib/ui/button'
import { useProgressBar } from '@/lib/hooks'
import { requestEditPostListOrder } from '@/entities/post'

interface Props {
    allPosts: Post[]
    totalCount: number
}

type DraggablePost = Post & CustomSortableItem

const DndProviderWithNoSSR = dynamic(() => import('@/features/common/dnd').then((md) => md.DndProvider), { ssr: false })

export const EditPostOrderByDnd: FC<Props> = ({ allPosts, totalCount }) => {
    const { executeWithProgress } = useProgressBar()

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

    const handleUpdatePostOrder = async () => {
        executeWithProgress(async () => {
            const updatedSequences = sortablePosts
                .filter((post) => post.sequence !== post.order)
                .map((post) => ({
                    id: post.id,
                    sequence: post.sequence,
                }))

            await requestEditPostListOrder({ updatedSequences })
        })

        setMode('view')
    }

    return (
        <section className='flex flex-col gap-6 '>
            <div className='flex w-full justify-between bg-emerald-100 items-center'>
                <div>
                    <h2>내글 수정하기</h2>
                    <p>총 개수 : {totalCount}</p>
                </div>
                <div className='flex gap-4'>
                    {mode === 'view' ? (
                        <Button onClick={() => setMode('edit')}>순서 수정</Button>
                    ) : (
                        <>
                            <Button onClick={handleUpdatePostOrder}>적용</Button>
                            <Button
                                onClick={() => setMode('view')}
                                variant='outline'>
                                취소
                            </Button>
                        </>
                    )}
                </div>
            </div>
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
