import { serverRequestGetAllPostList } from '@/entities/post'
import { TemporarySavedPostItem } from '@/features/post/temporary-saved'
import type { FC } from 'react'

const TemporaryListPage: FC = async () => {
    const response = await serverRequestGetAllPostList({ isPublished: false })

    if ('error' in response) {
        return null
    }

    const temporarySavedPosts = response.posts

    return (
        <main className='mx-auto  w-full max-w-4xl bg-black'>
            <section className='flex flex-col gap-4 py-10 items-center'>
                {temporarySavedPosts.map((post) => (
                    <TemporarySavedPostItem
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        summary={post.summary}
                        createdAt={post.createdAt.toString()}
                    />
                ))}
            </section>
        </main>
    )
}

export default TemporaryListPage
