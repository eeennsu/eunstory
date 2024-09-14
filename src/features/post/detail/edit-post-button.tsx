'use client'

import { requestDeletePost } from '@/entities/post'
import { useAdminAuth, useProgressBar } from '@/lib/hooks'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import type { FC } from 'react'

interface Props {
    id: string
}

export const EditPostButton: FC<Props> = ({ id }) => {
    const { isAdminAuthed } = useAdminAuth()
    const { barRouter } = useProgressBar()

    if (!isAdminAuthed) {
        return null
    }

    const handleEditLink = () => {
        barRouter.replace(routePaths.post.edit(id))
    }

    return (
        isAdminAuthed && (
            <Button
                type='button'
                onClick={handleEditLink}>
                Go to Edit
            </Button>
        )
    )
}
