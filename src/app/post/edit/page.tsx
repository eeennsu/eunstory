// post list edit page

import { serverRequestGetAllPostList } from '@/entities/post'
import { EditPostOrderWidget } from '@/widgets/post/edit'
import { FC } from 'react'

const EditPostListPage: FC = async () => {
    const postListResponse = await serverRequestGetAllPostList({ isPublished: true })

    if ('error' in postListResponse) {
        throw postListResponse.error
    }

    return (
        <main className='page-container max-w-[1200px] mx-auto pt-32'>
            {postListResponse.totalCount === 0 ? (
                '게시글이 없습니다.'
            ) : (
                <EditPostOrderWidget
                    allPosts={postListResponse.posts}
                    totalCount={postListResponse.totalCount}
                />
            )}
        </main>
    )
}

export default EditPostListPage
