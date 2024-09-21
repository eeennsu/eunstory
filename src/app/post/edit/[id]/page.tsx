import { serverRequestGetDetailPost } from '@/entities/post'
import { getServerAuth } from '@/lib/auth'
import { routePaths } from '@/lib/route'
import { PostFormWidget } from '@/widgets/post/common'
import { redirect } from 'next/navigation'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const EditDetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const { isAdminAuthorized } = await getServerAuth()

    if (!isAdminAuthorized) {
        return redirect(routePaths.home())
    }

    const response = await serverRequestGetDetailPost({ postId: id, isPublished: true })

    if (!('post' in response)) {
        throw response.error
    }

    const { post } = response

    return (
        <main className='page-container'>
            <PostFormWidget prevPost={post} />
        </main>
    )
}

export default EditDetailPostPage
