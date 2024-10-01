'use client'

import { type FC } from 'react'
import { Button } from '@/lib/ui/button'
import { requestEditPostListOrder } from '@/entities/post'
import { useProgressBar } from '@/lib/hooks'
import { DraggablePost } from '@/widgets/post/edit'

interface Props {
    totalCount: number
    mode: 'edit' | 'view'
    setMode: (mode: 'edit' | 'view') => void
    sortablePosts: DraggablePost[]
}

export const EditPostOrderHead: FC<Props> = ({ totalCount, mode, setMode, sortablePosts }) => {
    const { executeWithProgress } = useProgressBar()

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
    )
}
