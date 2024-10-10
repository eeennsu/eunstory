'use client'

import {
    requestCreatePostComment,
    requestDeletePostComment,
    requestEditPostComment,
} from '@/entities/post-comment/post-comment.api.client'
import { useProgressBar, useToast } from '@/lib/hooks'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { FilePenLine, LoaderCircle, Pencil, Trash } from 'lucide-react'
import { useState, type FC } from 'react'
import { ReplyItem } from './reply-item'
import { PostComment } from '@/entities/post-comment/post-comment.types'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { triggerUserLoginModal } from '@/entities/user'
import { ERROR_CODES } from '@/lib/fetch'
import { UserInfo } from '@/shared/post/detail'

interface Props {
    comment: PostComment
    currentUserId?: string
}

export const CommentItem: FC<Props> = ({ comment, currentUserId }) => {
    const { executeWithProgress, barRouter } = useProgressBar()
    const { toast } = useToast()

    const [editMode, setEditMode] = useState<'view' | 'edit'>('view')
    const [replyMode, setReplyMode] = useState<'view' | 'reply'>('view')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const [editedContent, setEditedContent] = useState<string>(comment.content)
    const [replyContent, setReplyContent] = useState<string>('')

    const isOwner = currentUserId === comment?.author?.id

    const isDisabled = isDeleting || isReplying

    const checkIsValid = () => {
        if (!currentUserId) {
            toast({
                type: 'info',
                title: ERROR_CODES.NEED_AUTHENTICATE.title,
            })

            triggerUserLoginModal(true)

            return false
        }

        return true
    }

    const handleEditComment = () => {
        if (!checkIsValid()) return

        if (editMode === 'edit') {
            executeWithProgress(async () => {
                try {
                    await requestEditPostComment({
                        postId: comment.postId,
                        content: editedContent,
                        id: comment.id,
                        userId: currentUserId!,
                    })

                    toast({
                        type: 'success',
                        title: '댓글이 수정되었습니다.',
                    })
                } catch (error) {
                    toast({
                        type: 'error',
                        title: '댓글 수정에 실패하였습니다.',
                        description: '관리자에게 문의해주세요.',
                    })
                    console.error(error)
                } finally {
                    setEditMode('view')
                    barRouter.refresh()
                }
            })
        } else {
            setEditMode('edit')
        }
    }

    const handleDeleteComment = () => {
        if (!checkIsValid()) return

        executeWithProgress(async () => {
            try {
                setIsDeleting(true)

                await requestDeletePostComment({
                    postId: comment.postId,
                    id: comment.id,
                    userId: currentUserId!,
                })

                toast({
                    type: 'success',
                    title: '댓글이 삭제되었습니다.',
                })
            } catch (error) {
                toast({
                    type: 'error',
                    title: '댓글 삭제에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                })
                console.error(error)
            } finally {
                setIsDeleting(false)
                barRouter.refresh()
            }
        })
    }

    const handleCreateReply = () => {
        if (!checkIsValid()) return

        if (replyContent.trim().length < 5) {
            toast({
                type: 'warning',
                title: '답글은 5자 이상 작성해주세요.',
            })

            return
        }

        setIsReplying(true)
        executeWithProgress(async () => {
            try {
                await requestCreatePostComment({
                    postId: comment.postId,
                    comment: {
                        content: replyContent,
                        parentId: comment.id,
                    },
                })
            } catch (error) {
                toast({
                    type: 'error',
                    title: '답글 작성에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                })
                console.error(error)
            } finally {
                setReplyMode('view')
                setReplyContent('')
                setIsReplying(false)
                barRouter.refresh()
            }
        })
    }

    const handleReplyTextareaOpen = () => {
        if (!currentUserId) {
            toast({
                type: 'info',
                title: ERROR_CODES.NEED_AUTHENTICATE.title,
            })

            triggerUserLoginModal(true)

            return
        }

        setReplyMode('reply')
    }

    return (
        <li className={'flex flex-col gap-4 px-5'}>
            <section className={cn('border-b border-gray-600 px-3', comment.isActive ? 'py-8' : 'py-6')}>
                {comment.isActive ? (
                    <div className='flex flex-col gap-3'>
                        <div className='flex w-full justify-between gap-4'>
                            <section className='flex flex-col gap-4 flex-grow max-w-[788px] break-words'>
                                <UserInfo
                                    author={comment?.author}
                                    createdAt={comment?.createdAt}
                                    updatedAt={comment?.updatedAt}
                                />
                                {comment.isActive && editMode === 'view' && (
                                    <p className='break-words w-full'>{comment.content}</p>
                                )}
                            </section>
                            <section
                                className={cn(
                                    'flex flex-col justify-between',
                                    editMode === 'view' ? 'w-[84px]' : 'w-fit'
                                )}>
                                {isOwner && (
                                    <div className='flex items-center gap-3'>
                                        {editMode === 'view' ? (
                                            <Button
                                                size='icon-sm'
                                                variant='signature'
                                                onClick={() => {
                                                    replyMode === 'reply' && setReplyMode('view')
                                                    setEditMode('edit')
                                                }}>
                                                <Pencil className='size-5' />
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    size='icon-sm'
                                                    variant='signature'
                                                    className='text-xs'
                                                    onClick={() => setEditMode('view')}>
                                                    취소
                                                </Button>
                                                <Button
                                                    size='icon-sm'
                                                    variant='tertiary'
                                                    onClick={handleEditComment}>
                                                    <FilePenLine className='size-5' />
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            onClick={handleDeleteComment}
                                            disabled={isDisabled}
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
                                {replyMode === 'view' ? (
                                    editMode === 'view' && (
                                        <Button
                                            size='sm'
                                            variant='signature'
                                            className='w-full gap-2'
                                            onClick={handleReplyTextareaOpen}>
                                            답글 달기
                                        </Button>
                                    )
                                ) : (
                                    <Button
                                        size='sm'
                                        variant='signature'
                                        className='w-full gap-2'
                                        onClick={() => setReplyMode('view')}>
                                        취소
                                    </Button>
                                )}
                            </section>
                        </div>
                        {comment.isActive && editMode === 'edit' && (
                            <Textarea
                                className='flex-1 min-h-[140px] mt-3'
                                value={editedContent}
                                placeholder='댓글을 수정해주세요.'
                                variant={'secondary'}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        )}
                    </div>
                ) : (
                    <p className='text-gray-500'>삭제된 댓글입니다.</p>
                )}
            </section>

            {comment?.isActive && replyMode === 'reply' && (
                <div className='flex gap-3 pl-[30px] py-6'>
                    <Textarea
                        className='flex-1 bg-gray-800 min-h-10 text-gray-300 border placeholder:text-gray-500 border-slate-700 rounded-lg px-4 py-3 focus:border focus:border-slate-700'
                        placeholder='답글을 입력해주세요.'
                        variant={'clear'}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className='flex flex-col'>
                        <Button
                            size='sm'
                            onClick={handleCreateReply}
                            className='flex-grow'
                            disabled={isDisabled}
                            variant={isReplying ? 'loading' : 'signature'}>
                            {isReplying ? <LoaderCircle className='animate-spin' /> : '답글 작성'}
                        </Button>
                    </div>
                </div>
            )}

            {!!comment?.replies?.length && (
                <ul className='flex flex-col gap-6 pl-4'>
                    {comment?.replies?.map((reply) => (
                        <ReplyItem
                            key={reply.id}
                            reply={reply}
                            currentUserId={currentUserId}
                            isOwner={isOwner}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}
