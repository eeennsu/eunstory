import { serverRequestGetDetailPost } from '@/entities/post'
import { PostFormWidget } from '@/widgets/post/common'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const EditDetailPostPage: FC<Props> = async ({ params: { id } }) => {
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
