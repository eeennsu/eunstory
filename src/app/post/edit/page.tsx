// post list edit page

import { serverRequestGetAllPostList } from '@/entities/post'
import { EditPostOrderWidget } from '@/widgets/post/edit'
import { FC } from 'react'

const EditPostListPage: FC = async () => {
    const responsePostList = await serverRequestGetAllPostList({ isPublished: true })

    if ('error' in responsePostList) {
        throw responsePostList.error
    }

    return (
        <main className='page-container max-w-4xl mx-auto pt-28'>
            {responsePostList.totalCount === 0 ? (
                <section className='text-gray-500 flex flex-grow flex-col items-center justify-center'>
                    저장된 포스트가 없습니다.
                </section>
            ) : (
                <EditPostOrderWidget
                    allPosts={responsePostList.posts}
                    totalCount={responsePostList.totalCount}
                />
            )}
        </main>
    )
}

export default EditPostListPage
