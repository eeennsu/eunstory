'use client'

import { ResponseGetAllCommentListType } from '@/app/api/admin/comment/route'
import { requestGetAllCommentList } from '@/entities/admin'
import { DiscussionItem } from '@/features/admin'
import { Pagination } from '@/features/common/pagination'
import { useAdminPagination, useAsync, useProgressBar, useToast } from '@/lib/hooks'
import { DashboardDataTitle } from '@/shared/admin'
import { DashboardDataContainer } from '@/shared/admin/dashboard-data-container'
import { EllipsisLoading } from '@/shared/common'
import { useState, type FC } from 'react'

export type Comment = Extract<ResponseGetAllCommentListType, { comments: any }>['comments'][number]

export const AdminCommentsWidget: FC = () => {
    const { toast } = useToast()

    const { commentPage, setCurDashboardPage } = useAdminPagination()

    const [totalPage, setTotalPage] = useState<number>(1)
    const [comments, setComments] = useState<Comment[]>([])

    const { isLoading, error } = useAsync(async () => {
        const responseComments = await requestGetAllCommentList({ curPage: commentPage, perPage: 4 })

        if ('error' in responseComments) {
            toast({ title: '계정 목록을 불러오는 중 오류가 발생했습니다.', type: 'error' })
            setComments([])
            return
        }

        setComments(responseComments.comments)
        setTotalPage(responseComments.totalPage)
    }, [commentPage])

    return (
        <DashboardDataContainer
            id='admin-dashboard-comments'
            className=''>
            <DashboardDataTitle title='댓글 목록' />
            {isLoading && <EllipsisLoading className='h-[396px]' />}
            {!error && (
                <section className='grid grid-cols-2 gap-6'>
                    {comments?.map((comment) => (
                        <DiscussionItem
                            key={comment.id}
                            comment={comment}
                        />
                    ))}
                </section>
            )}
            <Pagination
                curPage={commentPage}
                totalPage={totalPage}
                onPageChange={(page) => {
                    setCurDashboardPage({ page, type: 'comment' })
                }}
            />
        </DashboardDataContainer>
    )
}
