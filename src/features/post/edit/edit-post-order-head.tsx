'use client'

import { type FC } from 'react'
import { Button } from '@/lib/ui/button'
import { requestEditPostListOrder } from '@/entities/post'
import { useProgressBar, useToast } from '@/lib/hooks'
import { DraggablePost } from '@/widgets/post/edit'

interface Props {
    totalCount: number
    mode: 'edit' | 'view'
    setMode: (mode: 'edit' | 'view') => void
    sortablePosts: DraggablePost[]
}

export const EditPostOrderHead: FC<Props> = ({ totalCount, mode, setMode, sortablePosts }) => {
    const { executeWithProgress, barRouter } = useProgressBar()
    const { toast } = useToast()

    const handleUpdatePostOrder = async () => {
        executeWithProgress(async () => {
            try {
                const updatedSequences = sortablePosts
                    .filter((post) => post.sequence !== post.order)
                    .map((post) => ({
                        id: post.id,
                        sequence: post.sequence,
                    }))

                await requestEditPostListOrder({ updatedSequences })

                toast({
                    type: 'success',
                    title: '글 순서가 수정되었습니다.',
                })
            } catch (error) {
                console.error(error)
                toast({
                    type: 'error',
                    title: '글 순서 수정에 실패했습니다.',
                    description: '다시 시도해주세요.',
                })
            } finally {
                barRouter.refresh()
            }
        })

        setMode('view')
    }

    return (
        <section className='flex w-full justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md'>
            <div className='flex flex-col gap-0.5'>
                <h2 className='text-xl font-semibold text-gray-100'>내글 수정하기</h2>
                <p className='text-sm text-gray-400'>총 개수 : {totalCount}</p>
            </div>
            <div className='flex gap-2'>
                {mode === 'view' ? (
                    <Button
                        variant='tertiary'
                        className='bg-blue-600 text-white hover:bg-blue-700'
                        onClick={() => setMode('edit')}>
                        순서 수정
                    </Button>
                ) : (
                    <>
                        <Button
                            variant={'outline'}
                            className='bg-green-700 text-white hover:bg-green-600'
                            onClick={handleUpdatePostOrder}>
                            적용
                        </Button>
                        <Button
                            className='bg-gray-600 text-white hover:bg-gray-700 border border-gray-500'
                            onClick={() => setMode('view')}
                            variant='outline'>
                            취소
                        </Button>
                    </>
                )}
            </div>
        </section>
    )
}
