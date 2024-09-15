'use client'

import { requestDeletePost } from '@/entities/post'
import { useAdminAuth, useProgressBar } from '@/lib/hooks'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import { useToast } from '@/lib/ui/use-toast'
import type { FC } from 'react'

interface Props {
    id: string
}

export const DeletePostButton: FC<Props> = ({ id }) => {
    const { isAdminAuthed } = useAdminAuth()
    const { executeWithProgress, barRouter } = useProgressBar()
    const { toast } = useToast()

    if (!isAdminAuthed) {
        return null
    }

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) {
            return
        }

        executeWithProgress(async () => {
            try {
                await requestDeletePost({ postId: id, isPublished: true })
            } catch (error) {
                console.error(error)
                toast({ title: '게시물 삭제에 실패했습니다', description: '다시 시도해주세요.' })
            } finally {
                barRouter.replace(routePaths.post.list())
                barRouter.refresh()
            }
        })
    }

    return (
        isAdminAuthed && (
            <Button
                type='button'
                onClick={handleDelete}>
                DeletePostButton
            </Button>
        )
    )
}
