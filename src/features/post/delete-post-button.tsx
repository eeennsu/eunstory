'use client'

import { requestDeletePost } from '@/entities/post'
import { useProgressBar } from '@/lib/hooks'
import { routePaths } from '@/lib/route'
import { Button } from '@/shared/ui/button'
import type { FC } from 'react'

interface Props {
    id: string
}

export const DeletePostButton: FC<Props> = ({ id }) => {
    const { startBar, stopBar, router } = useProgressBar()

    const onDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) {
            return
        }

        startBar()

        try {
            await requestDeletePost({ id })
        } catch (error) {
            console.error(error)
            alert('게시물 삭제에 실패했습니다')
        } finally {
            router.replace(routePaths.post.list())
            stopBar()
        }
    }

    return <Button onClick={onDelete}>DeletePostButton</Button>
}
