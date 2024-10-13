import type { FC } from 'react'

interface Props {
    commentCount: number
}

export const CommentsCount: FC<Props> = ({ commentCount }) => {
    return (
        <div className='w-full flex gap-3 items-end'>
            <h2 className='text-xl font-semibold text-gray-100'>댓글 목록</h2>
            <p className='text-sm text-gray-400'>{commentCount}개</p>
        </div>
    )
}
