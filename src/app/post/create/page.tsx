'use client'

import { useAdminAuth } from '@/lib/hooks'
import { cn } from '@/lib/shadcn'
import { PostForm, PostPreview } from '@/widgets/home'
import type { FC } from 'react'

const CreatePostPage: FC = () => {
    const { isAdminAuthed } = useAdminAuth()

    if (!isAdminAuthed) {
        return null
    }

    return (
        <main className={cn('page-container', 'flex-row')}>
            <PostForm />
            <PostPreview />
        </main>
    )
}

export default CreatePostPage
