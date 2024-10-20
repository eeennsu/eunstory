'use client'

import { requestDeletePost } from '@/entities/post'
import { useProgressBar } from '@/lib/hooks'
import { Button } from '@/lib/ui/button'
import type { FC } from 'react'

interface Props {
    postId: string
    onDelete: () => void
}

export const DeleteButton: FC<Props> = ({ postId, onDelete }) => {
    const { executeWithProgress, barRouter } = useProgressBar()

    const handleDelete = () => {
        executeWithProgress(async () => {
            try {
                await requestDeletePost({ postId, isPublished: false })
                onDelete()
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
