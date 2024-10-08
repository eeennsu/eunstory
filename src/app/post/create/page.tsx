import { cn } from '@/lib/shadcn/shadcn-utils'
import { PostFormWidget } from '@/widgets/post/common'
import { Suspense, type FC } from 'react'

const CreatePostPage: FC = async () => {
    return (
        <main className={cn('page-container pt-24')}>
            <Suspense>
                <PostFormWidget />
            </Suspense>
        </main>
    )
}

export default CreatePostPage
