'use client'

import { requestDeletePost } from '@/entities/post'
import { callToast } from '@/lib/fetch'
import { useAdminSession, useProgressBar } from '@/lib/hooks'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import type { FC } from 'react'

interface Props {
    id: string
}

export const DeletePostButton: FC<Props> = ({ id }) => {
    const { isAdminAuthed } = useAdminSession()
    const { executeWithProgress, barRouter } = useProgressBar()

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
                callToast({
                    title: '게시물 삭제에 실패했습니다',
                    description: '다시 시도해주세요.',
                    variant: 'destructive',
                })
                console.error(error)
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
