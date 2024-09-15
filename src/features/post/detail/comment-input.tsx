'use client'

import { requestCreatePostComment } from '@/entities/post-comment/post-comment.api.client'
import { useProgressBar } from '@/lib/hooks'
import { Button } from '@/lib/ui/button'
import { Input } from '@/lib/ui/input'
import { useToast } from '@/lib/ui/use-toast'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { useState, type FC, type FormEvent } from 'react'

interface Props {
    postId: string
}

export const CommentInput: FC<Props> = ({ postId }) => {
    const { toast } = useToast()
    const { executeWithProgress } = useProgressBar()
    const { data: session } = useSession()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')

    const handleComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!session?.user || !session?.user?.id) {
            toast({
                title: '로그인이 필요합니다.',
                position: 'bottom',
                variant: 'warning',
            })

            return
        }

        if (!comment.length) {
            toast({
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
                        authorId: session?.user.id,
                    },
                })
            } catch (error) {
                console.error(error)
                toast({
                    title: '댓글을 작성에 실패했습니다.',
                    description: '관리자에게 문의해주세요.',
                    position: 'bottom',
                    variant: 'warning',
                })
            } finally {
                setIsSubmitting(false)
            }
        })
    }

    return (
        <form
            className='flex gap-3 items-center'
            onSubmit={handleComment}>
            <Input
                className='flex-[0.95]'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                type='submit'
                className='flex-[0.05]'
                variant={isSubmitting ? 'secondary' : 'default'}
                disabled={isSubmitting}>
                {isSubmitting ? 'loading...' : '작성'}
            </Button>
        </form>
    )
}
