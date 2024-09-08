// post list edit page

import { serverRequestGetAllPostList } from '@/entities/post'
import { EditPostOrderByDnd } from '@/features/post'
import { getServerAdminAuth } from '@/lib/auth'
import { routePaths } from '@/lib/route'
import { redirect } from 'next/navigation'
import { FC } from 'react'

const EditPostListPage: FC = async () => {
    const { isAdminAuthed } = await getServerAdminAuth()

    if (!isAdminAuthed) {
        return redirect(routePaths.home())
    }

    const postListResponse = await serverRequestGetAllPostList({ isPublished: true })

    if ('error' in postListResponse) {
        throw postListResponse.error
    }

    return (
        <main className='page-container max-w-[1200px] mx-auto'>
            {postListResponse.totalCount === 0 ? (
                '게시글이 없습니다.'
            ) : (
                <EditPostOrderByDnd
                    allPosts={postListResponse.posts}
                    totalCount={postListResponse.totalCount}
                />
            )}
        </main>
    )
}

export default EditPostListPage
