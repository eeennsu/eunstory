import { PostListBodyWidget, PostListHeadWidget } from '@/widgets/post/list'
import type { FC } from 'react'

const PostListPage: FC = async () => {
    return (
        <main className='page-container max-w-[1200px] mx-auto gap-10'>
            <PostListHeadWidget />
            <PostListBodyWidget />
        </main>
    )
}

export default PostListPage
