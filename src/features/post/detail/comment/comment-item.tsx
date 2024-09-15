'use client'

import { requestDeletePostComment } from '@/entities/post-comment/post-comment.api.client'
import { useProgressBar } from '@/lib/hooks'
import { useCustomSession } from '@/lib/hooks/use-custom-session'
import { Avatar, AvatarImage } from '@/lib/ui/avatar'
import { useToast } from '@/lib/ui/use-toast'
import dayjs from 'dayjs'
import { Pencil, Trash } from 'lucide-react'
import { useState, type FC } from 'react'

interface Props {
    postId: string
    commentId: string
    authorName: string
    authorImage: string | null
    content: string
    createdAt: Date
    isOwner: boolean
}

export const CommentItem: FC<Props> = ({ postId, commentId, content, createdAt, authorName, authorImage, isOwner }) => {
    const { user } = useCustomSession()
    const { executeWithProgress } = useProgressBar()
    const { toast } = useToast()

    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const handleDeleteComment = () => {
        const userId = user?.['@id']

        if (!userId) {
            toast({
                title: '유저의 정보를 찾을 수 없습니다.',
                description: '로그인 후 다시 시도해주세요.',
            })

            return
        }

        executeWithProgress(async () => {
            try {
                setIsDeleting(true)

                const response = await requestDeletePostComment({
                    postId,
                    id: commentId,
                    userId,
                })

                console.log(response)
            } catch (error) {
                console.error(error)
            } finally {
                setIsDeleting(false)
            }
        })
    }

    return (
        <li className='flex flex-col gap-4 p-3'>
            <div className='flex w-full justify-between'>
                <div className='flex gap-3 items-center'>
                    <Avatar>
                        <AvatarImage
                            src={
                                authorImage ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5BSEPxHF0-PRxJlVMHla55wvcxWdSi8RU2g&s'
                            }
                            alt={authorName}
                        />
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                        <p>{authorName}</p>
                        <time>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</time>
                    </div>
                </div>
                {isOwner && (
                    <div className='flex items-center gap-4'>
                        {/* <button>
                            <Pencil />
                        </button> */}
                        <button onClick={handleDeleteComment}>
                            <Trash />
                        </button>
                    </div>
                )}
            </div>
            <div>{content}</div>
        </li>
    )
}
