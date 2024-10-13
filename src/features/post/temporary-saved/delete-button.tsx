'use client'

import { requestDeletePost } from '@/entities/post'
import { useProgressBar } from '@/lib/hooks'
import { Button } from '@/lib/ui/button'
import type { FC } from 'react'

interface Props {
    postId: string
}

export const DeleteButton: FC<Props> = ({ postId }) => {
    const { executeWithProgress, barRouter } = useProgressBar()

    const handleDelete = () => {
        // 삭제 요청
        executeWithProgress(async () => {
            try {
                await requestDeletePost({ postId, isPublished: false })
            } catch (error) {
                console.log(error)
            } finally {
                barRouter.refresh()
            }
        })
    }

    return (
        <Button
            variant='link'
            onClick={handleDelete}>
            삭제
        </Button>
    )
}
