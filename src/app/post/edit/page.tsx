// post list edit page

import { getServerAdminAuth } from '@/lib/auth'
import { FC } from 'react'

const EditPostListPage: FC = async () => {
    const { isAdminAuthed } = await getServerAdminAuth()

    return (
        <main className='page-container max-w-[1200px] mx-auto'>
            <h2>내글 수정하기</h2>
        </main>
    )
}

export default EditPostListPage
