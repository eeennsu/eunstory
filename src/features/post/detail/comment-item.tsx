import { Comment } from '@prisma/client'
import type { FC } from 'react'
import dayjs from 'dayjs'

interface Props {
    comment: Comment
}

export const CommentItem: FC<Props> = ({ comment }) => {
    return (
        <li>
            <div>내용 - {comment.content}</div>
            <div>작성자 - {comment.authorId}</div>
            <div>작성일 - {dayjs(comment?.createdAt).format('YYYY년 MM월 dd일 hh:mm')}</div>
        </li>
    )
}
