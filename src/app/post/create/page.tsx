'use client'

import { useAdminAuth } from '@/lib/hooks'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { PostForm } from '@/widgets/home'
import type { FC } from 'react'

const CreatePostPage: FC = () => {
    const { isAdminAuthed } = useAdminAuth({ isProtectedRoute: true })

    if (!isAdminAuthed) {
        return null
    }

    return (
        <main className={cn('page-container')}>
            <PostForm />
        </main>
    )
}

export default CreatePostPage
