'use client'

import { requestDeletePostComment, requestEditPostComment } from '@/entities/post-comment/post-comment.api.client'
import { useProgressBar } from '@/lib/hooks'
import { useCustomSession } from '@/lib/hooks/use-custom-session'
import { Avatar, AvatarImage } from '@/lib/ui/avatar'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { useToast } from '@/lib/ui/use-toast'
import dayjs from 'dayjs'
import { FilePenLine, LoaderCircle, Pencil, Trash } from 'lucide-react'
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
    const { executeWithProgress, barRouter } = useProgressBar()
    const { toast } = useToast()

    const [mode, setMode] = useState<'view' | 'edit'>('view')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [editedContent, setEditedContent] = useState<string>(content)
    const userId = user?.['@id']

    const isValidateCheck = () => {
        if (!userId) {
            toast({
                title: '유저의 정보를 찾을 수 없습니다.',
                description: '로그인 후 다시 시도해주세요.',
            })

            return false
        }

        return true
    }

    const handleDeleteComment = () => {
        if (!isValidateCheck()) return

        executeWithProgress(async () => {
            try {
                setIsDeleting(true)

                await requestDeletePostComment({
                    postId,
                    id: commentId,
                    userId: userId!,
                })
            } catch (error) {
                toast({
                    title: '댓글 삭제에 실패하였습니다.',
                    description: '관리자에 문의해주세요.',
                })
                console.error(error)
            } finally {
                setIsDeleting(false)
                barRouter.refresh()
            }
        })
    }

    const handleEditComment = () => {
        if (!isValidateCheck()) return

        if (mode === 'edit') {
            executeWithProgress(async () => {
                try {
                    await requestEditPostComment({
                        postId,
                        content: editedContent,
                        id: commentId,
                        userId: userId!,
                    })
                } catch (error) {
                    toast({
                        title: '댓글 삭제에 실패하였습니다.',
                        description: '관리자에 문의해주세요.',
                    })
                    console.error(error)
                } finally {
                    setMode('view')
                    barRouter.refresh()
                }
            })
        } else {
            setMode('edit')
        }
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
                    <div className='flex items-center gap-3'>
                        <Button
                            size='icon-md'
                            variant='outline'
                            onClick={handleEditComment}>
                            {mode === 'view' ? <FilePenLine className='size-5' /> : <Pencil className='size-5' />}
                        </Button>

                        <Button
                            onClick={handleDeleteComment}
                            disabled={isDeleting}
                            variant={isDeleting ? 'loading' : 'default'}
                            size='icon-md'>
                            {isDeleting ? (
                                <LoaderCircle className='animate-spin size-5' />
                            ) : (
                                <Trash className='size-5' />
                            )}
                        </Button>
                    </div>
                )}
            </div>
            {mode === 'view' ? (
                <div>{content}</div>
            ) : (
                <Textarea
                    className='w-full h-32'
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                />
            )}
        </li>
    )
}
