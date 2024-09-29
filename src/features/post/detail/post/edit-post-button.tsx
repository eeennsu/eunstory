'use client'

import { useAdminSession, useProgressBar } from '@/lib/hooks'
import { mainPath } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import type { FC } from 'react'

interface Props {
    id: string
}

export const EditPostButton: FC<Props> = ({ id }) => {
    const { isAdminAuthorized } = useAdminSession()
    const { barRouter } = useProgressBar()

    if (!isAdminAuthorized) {
        return null
    }

    const handleEditLink = () => {
        barRouter.replace(mainPath.post.edit(id))
    }

    return (
        isAdminAuthorized && (
            <Button
                type='button'
                onClick={handleEditLink}>
                Go to Edit
            </Button>
        )
    )
}
