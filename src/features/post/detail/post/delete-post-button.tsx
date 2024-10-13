'use client'

import { requestDeletePost } from '@/entities/post'
import { useProgressBar, useToast } from '@/lib/hooks'
import { mainPath } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import { Trash2 } from 'lucide-react'
import type { FC } from 'react'

interface Props {
    id: string
}

export const DeletePostButton: FC<Props> = ({ id }) => {
    const { executeWithProgress, barRouter } = useProgressBar()
    const { toast } = useToast()

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) {
            return
        }

        executeWithProgress(async () => {
            try {
                await requestDeletePost({ postId: id, isPublished: true })
            } catch (error) {
                toast({
                    type: 'error',
                    title: '게시물 삭제에 실패했습니다',
                    description: '다시 시도해주세요.',
                })
                console.error(error)
            } finally {
                barRouter.replace(mainPath.post.list())
                barRouter.refresh()
            }
        })
    }

    return (
        <Button
            type='button'
            size={'icon-xs'}
            variant={'destructive'}
            onClick={handleDelete}>
            <Trash2 size={18} />
        </Button>
    )
}
