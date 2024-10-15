import { FloatingMenu } from '@/features/post/detail/post'
import { PostListSidebarWidget } from '@/widgets/post/list/post-list-sidebar-widget'
import type { FC, PropsWithChildren } from 'react'

const PostListLayout: FC<PropsWithChildren> = async ({ children }) => {
    return (
        <main className='page-container w-full mx-auto grid grid-cols-6 pt-36 pb-10'>
            <section className='col-span-1 w-fit'>
                <PostListSidebarWidget />
            </section>

            <section className='col-span-5'>{children}</section>
            <FloatingMenu
                hasBackButton={false}
                scrollThreshold={100}
            />
        </main>
    )
}

export default PostListLayout 