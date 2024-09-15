import { serverRequestGetCommentList } from '@/entities/post-comment/post-comment.api.server'
import type { FC } from 'react'

interface Props {
    postId: string
}

export const CommentList: FC<Props> = async ({ postId }) => {
    const response = await serverRequestGetCommentList({ postId })

    if ('error' in response) {
        return null
    }

    return (
        <section>
            <div className='w-full flex gap-2'>
                <h2>댓글 목록</h2>
                <p>{response?.commentCount} 개</p>
            </div>
            <ul>
                {response?.comments?.map((comment) => (
                    <li key={comment.id}>
                        <div>{comment.content}</div>
                        <div>{comment.authorId}</div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
