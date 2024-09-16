'use client'

import { requestCreatePostComment } from '@/entities/post-comment/post-comment.api.client'
import { callToast } from '@/lib/fetch'
import { useProgressBar } from '@/lib/hooks'
import { useCustomSession } from '@/lib/hooks/use-custom-session'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { LoaderCircle } from 'lucide-react'
import { useState, type FC, type FormEvent } from 'react'

interface Props {
    postId: string
}

export const CommentInput: FC<Props> = ({ postId }) => {
    const { executeWithProgress, barRouter } = useProgressBar()
    const { isAuthenticated } = useCustomSession()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')

    const handleComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isAuthenticated) {
            callToast({
                type: 'NEED_AUTHENTICATE',
                position: 'bottom',
                variant: 'warning',
            })

            return
        }

        if (!comment.length) {
            callToast({
                title: '댓글을 입력해주세요.',
                position: 'bottom',
                variant: 'warning',
            })
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
        <form
            className='flex gap-3 items-center'
            onSubmit={handleComment}>
            <Textarea
                className='flex-1'
                placeholder='댓글을 입력해주세요.'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                type='submit'
                disabled={isSubmitting}
                className='h-20 w-16'
                variant={isSubmitting ? 'loading' : 'default'}>
                {isSubmitting ? <LoaderCircle className='animate-spin' /> : '등록'}
            </Button>
        </form>
    )
}
