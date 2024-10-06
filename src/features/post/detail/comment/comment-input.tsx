'use client'

import { requestCreatePostComment } from '@/entities/post-comment/post-comment.api.client'
import { callToast } from '@/lib/fetch'
import { useProgressBar } from '@/lib/hooks'
import { useCustomSession } from '@/lib/hooks/use-custom-session'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { LoaderCircle } from 'lucide-react'
import { useState, type FC, type FormEvent } from 'react'
import { CommentsCount } from './comments-count'

interface Props {
    postId: string
    commentCount: number
}

export const CommentInput: FC<Props> = ({ postId, commentCount }) => {
    const { executeWithProgress, barRouter } = useProgressBar()
    const { isAuthenticated } = useCustomSession()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')

    const authCheck = () => {
        if (!isAuthenticated) {
            callToast({
                type: 'NEED_AUTHENTICATE',
                position: 'bottom',
                variant: 'warning',
            })

            return false
        }

        if (!comment.length) {
            callToast({
                title: '댓글을 입력해주세요.',
                position: 'bottom',
                variant: 'warning',
            })
            return false
        }

        return true
    }

    const handleComment = async () => {
        if (!authCheck()) {
            return
        }

        executeWithProgress(async () => {
            setIsSubmitting(true)

            try {
                await requestCreatePostComment({
                    postId,
                    comment: {
                        content: comment,
                        parentId: null,
                    },
                })
            } catch (error) {
                callToast({
                    title: '댓글을 작성에 실패했습니다.',
                    description: '관리자에게 문의해주세요.',
                    variant: 'destructive',
                })
                console.error(error)
            } finally {
                setIsSubmitting(false)
                setComment('')
                barRouter.refresh()
            }
        })
    }

    return (
        <section className='flex flex-col gap-4'>
            <CommentsCount commentCount={commentCount} />

            <div className='flex flex-col gap-3 items-end'>
                <Textarea
                    className='flex-1 min-h-[140px]'
                    placeholder='댓글을 입력해주세요.'
                    variant={'secondary'}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    onClick={handleComment}
                    disabled={isSubmitting}
                    className='border-none text-white rounded-lg'
                    size={'lg'}
                    variant={isSubmitting ? 'loading' : 'signature'}>
                    {isSubmitting ? <LoaderCircle className='animate-spin' /> : '댓글 작성'}
                </Button>
            </div>
        </section>
    )
}
