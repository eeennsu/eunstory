'use client'

import { requestDeletePostComment, requestEditPostComment } from '@/entities/post-comment/post-comment.api.client'
import { PostComment } from '@/entities/post-comment/post-comment.types'
import { callToast } from '@/lib/fetch'
import { useProgressBar } from '@/lib/hooks'
import { Avatar, AvatarImage } from '@/lib/ui/avatar'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { formatBeforeTime } from '@/lib/utils'
import { defaultUserIcon } from '@/shared/constants'
import { CornerDownRight, FilePenLine, LoaderCircle, Pencil, Trash, Undo2 } from 'lucide-react'
import { useState, type FC } from 'react'

interface Props {
    reply: PostComment
    currentUserId?: string
    isOwner: boolean
}

export const ReplyItem: FC<Props> = ({ reply, currentUserId, isOwner }) => {
    const { executeWithProgress, barRouter } = useProgressBar()

    const [editedContent, setEditedContent] = useState<string>(reply.content)
    const [editMode, setEditMode] = useState<'view' | 'edit'>('view')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const isValidateCheck = () => {
        if (!currentUserId) {
            callToast({
                type: 'NEED_AUTHENTICATE',
                variant: 'destructive',
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
            } catch (error) {
                callToast({
                    title: '답글 수정에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                    variant: 'destructive',
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
            } catch (error) {
                callToast({
                    title: '답글 수정에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                    variant: 'destructive',
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
        <li className='flex w-full gap-5'>
            <CornerDownRight className='mt-4' />
            <section className='flex flex-grow flex-col gap-3 rounded-lg bg-indigo-200 p-5 max-w-[876px]'>
                {reply?.isActive ? (
                    <>
                        <section className='flex w-full justify-between'>
                            <figure className='flex gap-3 items-center'>
                                <Avatar>
                                    <AvatarImage
                                        src={reply?.author?.image || defaultUserIcon}
                                        alt={reply?.author?.name}
                                    />
                                </Avatar>
                                <div className='flex flex-col gap-1'>
                                    <figcaption>{reply?.author?.name}</figcaption>
                                    <div className='flex gap-2'>
                                        <time>{formatBeforeTime(reply?.createdAt)}</time>
                                        {reply?.updatedAt && <span>(수정됨)</span>}
                                    </div>
                                </div>
                            </figure>
                            {isOwner && (
                                <div className='flex items-center gap-3'>
                                    {editMode === 'view' ? (
                                        <Button
                                            size='icon-md'
                                            variant='outline'
                                            onClick={() => setEditMode('edit')}>
                                            <FilePenLine className='size-5' />
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                size='icon-md'
                                                variant='outline'
                                                onClick={() => setEditMode('view')}>
                                                <Undo2 className='size-5' />
                                            </Button>
                                            <Button
                                                size='icon-md'
                                                variant='default'
                                                onClick={handleEditReply}>
                                                <Pencil className='size-5' />
                                            </Button>
                                        </>
                                    )}
                                    <Button
                                        onClick={handleDeleteReply}
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
                        </section>
                        {editMode === 'view' ? (
                            <p className='break-words'>{reply?.content}</p>
                        ) : (
                            <Textarea
                                className='w-full'
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        )}
                    </>
                ) : (
                    <p>삭제된 답글입니다.</p>
                )}
            </section>
        </li>
    )
}
