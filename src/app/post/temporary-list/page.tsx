import { serverRequestGetAllPostList } from '@/entities/post'
import { TemporarySavedPostItem } from '@/features/post/temporary-saved'
import type { FC } from 'react'

const TemporaryListPage: FC = async () => {
    const responseAllPosts = await serverRequestGetAllPostList({ isPublished: false })

    if ('error' in responseAllPosts) {
        throw responseAllPosts.error
    }

    const temporarySavedPosts = responseAllPosts.posts || []

    return (
        <main className='page-container mx-auto w-full gap-6 max-w-4xl pt-28 pb-8'>
            {temporarySavedPosts.length > 0 ? (
                <section className='flex flex-col gap-6'>
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
            ) : (
                <section className='flex items-center justify-center flex-1 text-gray-500'>
                    임시 저장된 포스트가 없습니다.
                </section>
            )}
        </main>
    )
}

export default TemporaryListPage
