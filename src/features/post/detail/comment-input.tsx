'use client'

import { Button } from '@/lib/ui/button'
import { Input } from '@/lib/ui/input'
import { useToast } from '@/lib/ui/use-toast'
import { useState, type FC, type FormEvent } from 'react'

export const CommentInput: FC = () => {
    const { toast } = useToast()
    const [comment, setComment] = useState<string>('')

    const handleComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!comment.length) {
            toast({
                title: '댓글을 입력해주세요.',
                position: 'bottom',
                variant: 'warning',
            })
            return
        }
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
                className='flex-[0.05]'>
                작성하기
            </Button>
        </form>
    )
}
