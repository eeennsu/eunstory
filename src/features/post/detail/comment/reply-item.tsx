'use client'

import { requestDeletePostComment, requestEditPostComment } from '@/entities/post-comment/post-comment.api.client'
import { PostComment } from '@/entities/post-comment/post-comment.types'
import { ERROR_CODES } from '@/lib/fetch'
import { useProgressBar, useToast } from '@/lib/hooks'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { Avatar, AvatarImage } from '@/lib/ui/avatar'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { formatBeforeTime } from '@/lib/utils'
import { defaultUserIcon } from '@/shared/constants'
import { CornerDownRight, FilePenLine, LoaderCircle, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
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
                type: 'warning',
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
                    'flex flex-grow flex-col gap-3 rounded-lg bg-gray-800 px-7',
                    reply.isActive ? 'py-6' : 'py-3'
                )}>
                {reply?.isActive ? (
                    <>
                        <section className='flex w-full justify-between'>
                            <Link
                                href={reply.author.url || '#'}
                                target='_blank'
                                className='inline-flex gap-3 items-center cursor-pointer hover:bg-gray-500 p-1 rounded-md'>
                                <Avatar>
                                    <AvatarImage
                                        src={reply?.author?.image || defaultUserIcon}
                                        alt={reply?.author?.name}
                                    />
                                </Avatar>
                                <div className='flex flex-col'>
                                    <span className='text-gray-200 font-medium'>{reply?.author?.name}</span>{' '}
                                    <div className='flex gap-2 text-gray-400 text-sm'>
                                        <time>{formatBeforeTime(reply?.createdAt)}</time>
                                        {reply?.updatedAt && <span>(수정됨)</span>}
                                    </div>
                                </div>
                            </Link>
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
                                className='w-full mt-3 bg-gray-900/45'
                                variant={'secondary'}
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        )}
                    </>
                ) : (
                    <p className='text-gray-400'>삭제된 답글입니다.</p>
                )}
            </section>
        </li>
    )
}
