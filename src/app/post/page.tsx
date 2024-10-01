import { getServerAuth } from '@/lib/auth'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { PostListBodyWidget, PostListHeadWidget, PostListSidebarWidget } from '@/widgets/post/list'
import type { FC } from 'react'

const PostListPage: FC = async () => {
    const { isAdminAuthorized } = await getServerAuth()

    return (
        <main className={cn('page-container w-full mx-auto', 'grid grid-cols-6')}>
            <section className='col-span-1'>
                <PostListSidebarWidget />
            </section>
            <section className='relative flex flex-col gap-6 flex-grow col-span-5 lg:px-48 md:px-20 px-8 pt-[140px] pb-10'>
                {isAdminAuthorized && <PostListHeadWidget />}

                <PostListBodyWidget />
            </section>
        </main>
    )
}

export default PostListPage
