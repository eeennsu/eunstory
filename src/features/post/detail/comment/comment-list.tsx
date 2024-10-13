import type { FC } from 'react'
import { CommentItem } from './comment-item'
import { getServerAuth } from '@/lib/auth'
import { PostComment } from '@/entities/post-comment/post-comment.types'

interface Props {
    comments: PostComment[]
}

export const CommentList: FC<Props> = async ({ comments }) => {
    const { user } = await getServerAuth()
    const currentUserId = user?.['@id']

    const reducedComment = comments.reduce<PostComment[]>((acc, cur) => {
        if (!cur.parentId) {
            const replies = comments.filter((comment) => comment.parentId === cur.id)
            return [...acc, { ...cur, replies: !!replies.length ? replies : null }]
        } else {
            const parent = comments.find((comment) => comment.id === cur.parentId)
            return acc.map((comment) => ({
                ...comment,
                parent,
            }))
        }
    }, [])

    return (
        <section className='px-7 pb-7'>
            {!!reducedComment?.length &&
                reducedComment?.map((comment) => (
                    <CommentItem
                        key={comment?.id}
                        comment={comment}
                        currentUserId={currentUserId}
                    />
                ))}
        </section>
    )
}
