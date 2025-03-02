'use client'

import { requestGetCommentList } from '@/entities/post-comment/post-comment.api.client'
import { PostComment } from '@/entities/post-comment/post-comment.types'
import { CommentInput, CommentList } from '@/features/post/detail/comment'
import { useAsync } from '@/lib/hooks'
import { EllipsisLoading } from '@/shared/common'
import { useState, type FC } from 'react'

interface Props {
    postId: string
}

export const UserCommentWidget: FC<Props> = ({ postId }) => {
    const [commentCount, setCommentCount] = useState<number>(0)
    const [commentList, setCommentList] = useState<PostComment[]>([])

    const { isLoading, error } = useAsync(async () => {
        const responseCommentList = await requestGetCommentList({ postId })

        if ('error' in responseCommentList) {
            throw responseCommentList.error
        }

        setCommentList(responseCommentList?.commentList as PostComment[])
        setCommentCount(responseCommentList?.commentCount || 0)
    }, [])

    return (
        <section className='flex flex-col gap-3'>
            <CommentInput
                postId={postId}
                commentCount={commentCount}
            />
            {isLoading ? <EllipsisLoading /> : !error && <CommentList comments={commentList as PostComment[]} />}
        </section>
    )
}
