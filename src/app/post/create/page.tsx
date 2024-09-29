import { cn } from '@/lib/shadcn/shadcn-utils'
import { PostFormWidget } from '@/widgets/post/common'
import type { FC } from 'react'

const CreatePostPage: FC = async () => {
    return (
        <main className={cn('page-container')}>
            <PostFormWidget />
        </main>
    )
}

export default CreatePostPage
