'use client'

import type { FC } from 'react'
import { EditPostButton } from './edit-post-button'
import { DeletePostButton } from './delete-post-button'
import { useAdminSession } from '@/lib/hooks'

interface Props {
    postId: string
}

export const PostAuthorButtons: FC<Props> = ({ postId }) => {
    const { isAdminAuthorized } = useAdminSession()

    return (
        isAdminAuthorized && (
            <div className='flex gap-4'>
                <EditPostButton id={postId} />
                <DeletePostButton id={postId} />
            </div>
        )
    )
}
