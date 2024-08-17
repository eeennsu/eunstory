import { requestGetDetailPost } from '@/entities/post'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const EditPostPage: FC<Props> = async ({ params: { id } }) => {
    const { post } = await requestGetDetailPost({ id })

    return (
        <div>
            <h2>edit post page</h2>
            <div>{post.title}</div>
            <div>{post.content}</div>
        </div>
    )
}

export default EditPostPage
