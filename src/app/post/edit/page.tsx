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
        <main className='page-container max-w-[1200px] mx-auto pt-32'>
            {responsePostList.totalCount === 0 ? (
                '게시글이 없습니다.'
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
