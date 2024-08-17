import { PostListBodyWidget, PostListHeadWidget } from '@/widgets/post/list'
import type { FC } from 'react'

const PostListPage: FC = () => {
    return (
        <main className='page-container max-w-[1200px] mx-auto'>
            <PostListHeadWidget />
            <PostListBodyWidget />
        </main>
    )
}

export default PostListPage
