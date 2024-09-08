// post list edit page

import { serverRequestGetAllPostList } from '@/entities/post'
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
            <h2>내글 수정하기</h2>
        </main>
    )
}

export default EditPostListPage
