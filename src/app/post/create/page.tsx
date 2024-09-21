import { getServerAuth } from '@/lib/auth'
import { routePaths } from '@/lib/route'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { PostFormWidget } from '@/widgets/post/common'
import { redirect } from 'next/navigation'
import type { FC } from 'react'

const CreatePostPage: FC = async () => {
    const { isAdminAuthorized } = await getServerAuth()

    if (!isAdminAuthorized) {
        return redirect(routePaths.home())
    }

    return (
        <main className={cn('page-container')}>
            <PostFormWidget />
        </main>
    )
}

export default CreatePostPage
