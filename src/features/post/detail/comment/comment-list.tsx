import { serverRequestGetCommentList } from '@/entities/post-comment/post-comment.api.server'
import type { FC } from 'react'
import { CommentItem } from './comment-item'
import { getServerAuth } from '@/lib/auth'

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

    return (
        <section>
            <div className='w-full flex gap-2'>
                <h2>댓글 목록</h2>
                <p>{response?.commentCount} 개</p>
            </div>
            <ul className='flex flex-col gap-6 bg-teal-100 rounded-md p-4'>
                {response?.comments?.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        postId={postId}
                        commentId={comment.id}
                        authorImage={comment.author.image}
                        authorName={comment.author.name}
                        content={comment.content}
                        createdAt={comment.createdAt}
                        isOwner={currentUserId === comment.author.id}
                    />
                ))}
            </ul>
        </section>
    )
}
