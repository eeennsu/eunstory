import { serverRequestGetCommentList } from '@/entities/post-comment/post-comment.api.server'
import type { FC } from 'react'

interface Props {
    postId: string
}

export const CommentList: FC<Props> = async ({ postId }) => {
    const response = await serverRequestGetCommentList({ postId })

    return (
        <div>
            <h3>댓글 목록</h3>
        </div>
    )
}
