import { requestGetDetailPost } from '@/entities/post'
import { DeletePostButton } from '@/features/post'
import { getDateWithTime } from '@/lib/utils'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const DetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const { post } = await requestGetDetailPost({ id })

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.createdAt && <div>{getDateWithTime(post.createdAt)}</div>}
            <DeletePostButton id={id} />
        </div>
    )
}

export default DetailPostPage
