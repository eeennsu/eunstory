import { requestGetPostList } from '@/entities/post'
import { routePaths } from '@/lib/route'
import Link from 'next/link'
import { FC } from 'react'

export const PostListBodyWidget: FC = async () => {
    const { posts } = await requestGetPostList({})

    return (
        <section className='flex gap-10'>
            {posts.map((post) => (
                <Link
                    key={post.id}
                    href={routePaths.post.detail(post.id)}
                    className='hover:scale-110'>
                    <div className='border-2 border-black p-2'>{post.title}</div>
                </Link>
            ))}
        </section>
    )
}
