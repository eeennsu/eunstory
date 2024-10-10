'use client'

import { requestDeletePostComment, requestEditPostComment } from '@/entities/post-comment/post-comment.api.client'
import { PostComment } from '@/entities/post-comment/post-comment.types'
import { ERROR_CODES } from '@/lib/fetch'
import { useProgressBar, useToast } from '@/lib/hooks'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { UserInfo } from '@/shared/post/detail'
import { CornerDownRight, FilePenLine, LoaderCircle, Pencil, Trash } from 'lucide-react'
import { useState, type FC } from 'react'

interface Props {
    reply: PostComment
    currentUserId?: string
    isOwner: boolean
}

export const ReplyItem: FC<Props> = ({ reply, currentUserId, isOwner }) => {
    const { executeWithProgress, barRouter } = useProgressBar()
    const { toast } = useToast()

    const [editedContent, setEditedContent] = useState<string>(reply.content)
    const [editMode, setEditMode] = useState<'view' | 'edit'>('view')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const isValidateCheck = () => {
        if (!currentUserId) {
            toast({
                type: 'info',
                title: ERROR_CODES.NEED_AUTHENTICATE.title,
            })
            return false
        }

        return true
    }

    const handleEditReply = () => {
        if (!isValidateCheck()) return

        executeWithProgress(async () => {
            try {
                await requestEditPostComment({
                    id: reply?.id,
                    content: editedContent,
                    postId: reply?.postId,
                    userId: currentUserId!,
                })

                toast({
                    type: 'success',
                    title: '답글이 수정되었습니다.',
                })
            } catch (error) {
                toast({
                    type: 'error',
                    title: '답글 수정에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                })
                console.error(error)
            } finally {
                setEditMode('view')
                setIsDeleting(false)
                barRouter.refresh()
            }
        })
    }

    const handleDeleteReply = () => {
        if (!isValidateCheck()) return

        executeWithProgress(async () => {
            try {
                await requestDeletePostComment({
                    id: reply?.id,

                    postId: reply?.postId,
                    userId: currentUserId!,
                })

                toast({
                    type: 'success',
                    title: '답글이 삭제되었습니다.',
                })
            } catch (error) {
                toast({
                    type: 'error',
                    title: '답글 수정에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                })
                console.error(error)
            } finally {
                setEditMode('view')
                setEditedContent('')
                setIsDeleting(false)
                barRouter.refresh()
            }
        })
    }

    return (
        <li className='flex w-full gap-3'>
            <CornerDownRight className='mt-2.5 text-gray-400 size-6' />
            <section
                className={cn(
                    'flex flex-grow flex-col gap-3  border-b border-b-gray-600  px-2 mx-5',
                    reply.isActive ? 'py-8' : 'py-6'
                )}>
                {reply?.isActive ? (
                    <>
                        <section className='flex w-full justify-between'>
                            <UserInfo
                                author={reply?.author}
                                createdAt={reply?.createdAt}
                                updatedAt={reply?.updatedAt}
                            />

                            {isOwner && (
                                <div className='flex items-center gap-3'>
                                    {editMode === 'view' ? (
                                        <Button
                                            size='icon-sm'
                                            variant='signature'
                                            onClick={() => setEditMode('edit')}>
                                            <Pencil className='size-5' />
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                size='icon-sm'
                                                variant='signature'
                                                onClick={() => setEditMode('view')}>
                                                취소
                                            </Button>
                                            <Button
                                                size='icon-sm'
                                                variant='tertiary'
                                                onClick={handleEditReply}>
                                                <FilePenLine className='size-5' />
                                            </Button>
                                        </>
                                    )}
                                    <Button
                                        onClick={handleDeleteReply}
                                        disabled={isDeleting}
                                        variant={isDeleting ? 'loading' : 'destructive'}
                                        size='icon-sm'>
                                        {isDeleting ? (
                                            <LoaderCircle className='animate-spin size-5' />
                                        ) : (
                                            <Trash className='size-5' />
                                        )}
                                    </Button>
                                </div>
                            )}
                        </section>
                        {editMode === 'view' ? (
                            <p className='text-gray-300 font-medium break-words'>{reply?.content}</p>
                        ) : (
                            <Textarea
                                className='w-full mt-3 bg-gray-800'
                                variant={'secondary'}
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        )}
                    </>
                ) : (
                    <p className='text-gray-500'>삭제된 답글입니다.</p>
                )}
            </section>
        </li>
    )
}
