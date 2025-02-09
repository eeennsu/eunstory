import type { FC } from 'react'
import { PostListBodyWidget, PostListHeadWidget } from '@/widgets/post/list'

const PostListPage: FC = async () => {
    return (
        <section className='relative flex flex-col gap-6 flex-grow lg:px-36 md:px-20 px-8 pb-10'>
            <PostListHeadWidget />
            <PostListBodyWidget />
        </section>
    )
}

export default PostListPage

export const dynamic = 'force-dynamic'
