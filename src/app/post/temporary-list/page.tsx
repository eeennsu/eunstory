import { serverRequestGetAllPostList } from '@/entities/post'
import { TemporarySavedPostItem } from '@/features/post/temporary-saved'
import type { FC } from 'react'

const TemporaryListPage: FC = async () => {
    const responseAllPosts = await serverRequestGetAllPostList({ isPublished: false })

    if ('error' in responseAllPosts) {
        throw responseAllPosts.error
    }

    const temporarySavedPosts = responseAllPosts.posts

    return (
        <main className='page-container mx-auto w-full gap-3 max-w-4xl pt-28 pb-8'>
            <h2 className='text-2xl font-bold text-gray-100 mb-6'>임시 저장된 포스트</h2> {/* 리스트 제목 추가 */}
            <div className='flex flex-col gap-6'>
                {temporarySavedPosts.map((post) => (
                    <TemporarySavedPostItem
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        summary={post.summary}
                        createdAt={post.createdAt.toString()}
                    />
                ))}
            </div>
        </main>
    )
}

export default TemporaryListPage
