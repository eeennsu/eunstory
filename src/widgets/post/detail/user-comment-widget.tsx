import { CommentInput, CommentList } from '@/features/post/detail'
import type { FC } from 'react'

export const UserCommentWidget: FC = () => {
    return (
        <section>
            <CommentInput />
            <CommentList />
        </section>
    )
}
