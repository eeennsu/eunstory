'use client'

import { PostListItem } from '@/app/api/post/route'
import { requestGetAllPostList, serverRequestGetAllPostList } from '@/entities/post'
import { TemporarySavedPostItem } from '@/features/post/temporary-saved'
import { useAsync } from '@/lib/hooks'
import { useState, type FC } from 'react'

const TemporaryListPage: FC = () => {
    const [temporaryPosts, setTemporaryPosts] = useState<PostListItem[]>([])

    const { isLoading } = useAsync(async () => {
        const responseAllPosts = await requestGetAllPostList({ isPublished: false })

        if ('error' in responseAllPosts) {
            return
        }

        setTemporaryPosts(responseAllPosts?.posts || [])
    }, [])

    const handleDeletePost = (postId: string) => {
        setTemporaryPosts((prev) => prev.filter((post) => post.id !== postId))
    }

    return (
        !isLoading && (
            <main className='page-container mx-auto w-full gap-6 max-w-4xl pt-28 pb-8'>
                {temporaryPosts.length > 0 ? (
                    <section className='flex flex-col gap-6'>
                        {temporaryPosts.map((post) => (
                            <TemporarySavedPostItem
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                summary={post.summary}
                                createdAt={post.createdAt.toString()}
                                onDelete={() => handleDeletePost(post.id)}
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
    )
}

export default TemporaryListPage
