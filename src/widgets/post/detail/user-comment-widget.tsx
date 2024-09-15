import { CommentInput, CommentList } from '@/features/post/detail/comment'
import type { FC } from 'react'

interface Props {
    postId: string
}

export const UserCommentWidget: FC<Props> = ({ postId }) => {
    return (
        <section className='flex flex-col p-5 bg-slate-200 gap-6'>
            <CommentInput postId={postId} />
            <CommentList postId={postId} />
        </section>
    )
}
