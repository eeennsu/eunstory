import { cn } from '@/lib/shadcn'
import { PostForm, PostPreview } from '@/widgets/home'
import type { FC } from 'react'

const CreatePostPage: FC = () => {
    return (
        <main className={cn('page-container', 'flex-row')}>
            <PostForm />
            <PostPreview />
        </main>
    )
}

export default CreatePostPage
