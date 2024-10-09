import { getServerAuth } from '@/lib/auth'
import { PostListBodyWidget, PostListHeadWidget } from '@/widgets/post/list'
import type { FC } from 'react'

const PostListPage: FC = async () => {
    const { isAdminAuthorized } = await getServerAuth()

    return (
        <section className='relative flex flex-col gap-6 flex-grow lg:px-36 md:px-20 px-8 pt-10 pb-10'>
            {isAdminAuthorized && <PostListHeadWidget />}

            <PostListBodyWidget />
        </section>
    )
}

export default PostListPage
