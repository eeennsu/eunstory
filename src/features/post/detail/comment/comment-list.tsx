import { serverRequestGetCommentList } from '@/entities/post-comment/post-comment.api.server'
import type { FC } from 'react'
import { CommentItem } from './comment-item'
import { getServerAuth } from '@/lib/auth'
import { PostComment } from '@/entities/post-comment/post-comment.types'

interface Props {
    postId: string
}

export const CommentList: FC<Props> = async ({ postId }) => {
    const response = await serverRequestGetCommentList({ postId })
    const { user } = await getServerAuth()
    const currentUserId = user?.['@id']

    if ('error' in response) {
        return null
    }

    const comments = response.comments as PostComment[]

    const reducedComment = comments.reduce<PostComment[]>((acc, cur) => {
        // parentId 가 없는 것은 댓글
        if (!cur.parentId) {
            const replies = comments.filter((comment) => comment.parentId === cur.id)

            return [...acc, { ...cur, replies: !!replies.length ? replies : null }]
        }

        // parentId 가 있는 것은 답글
        else {
            const parent = comments.find((comment) => comment.id === cur.parentId)

            return [...acc, { ...cur, parent }]
        }
    }, [])

    return (
        <section>
            <div className='w-full flex gap-2'>
                <h2>댓글 목록</h2>
                <p>{response?.commentCount} 개</p>
            </div>
            {!!reducedComment?.length && (
                <ul className='flex flex-col gap-2 bg-teal-100 rounded-md p-4'>
                    {reducedComment?.map((comment) => (
                        <CommentItem
                            key={comment?.id}
                            comment={comment}
                            currentUserId={currentUserId}
                        />
                    ))}
                </ul>
            )}
        </section>
    )
}
