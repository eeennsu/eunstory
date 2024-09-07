import { requestGetDetailPost } from '@/entities/post'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const EditDetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const response = await requestGetDetailPost({ id })

    if (!('post' in response)) {
        throw response.error
    }

    const { post } = response

    return (
        <div>
            <h2>edit post page</h2>
            <div>{post.title}</div>
            <div>{post.content}</div>
        </div>
    )
}

export default EditDetailPostPage
