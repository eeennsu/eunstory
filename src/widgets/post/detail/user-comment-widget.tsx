import { serverRequestGetCommentList } from '@/entities/post-comment/post-comment.api.server'
import { PostComment } from '@/entities/post-comment/post-comment.types'
import { CommentInput, CommentList } from '@/features/post/detail/comment'
import type { FC } from 'react'

interface Props {
    postId: string
}

export const UserCommentWidget: FC<Props> = async ({ postId }) => {
    const responseCommentList = await serverRequestGetCommentList({ postId })

    if ('error' in responseCommentList) {
        return null
    }

    return (
        <section className='flex flex-col gap-9 px-10'>
            <CommentInput
                postId={postId}
                commentCount={responseCommentList.commentCount}
            />
            {!!responseCommentList.commentList.length && (
                <CommentList comments={responseCommentList.commentList as PostComment[]} />
            )}
        </section>
    )
}
