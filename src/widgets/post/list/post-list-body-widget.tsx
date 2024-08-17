import { requestGetPostList } from '@/entities/post'
import { FC } from 'react'

export const PostListBodyWidget: FC = async () => {
    const { posts } = await requestGetPostList({})

    return (
        <section className='flex gap-10'>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className='border-2 border-black p-2'>
                    {post.title}
                </div>
            ))}
        </section>
    )
}
