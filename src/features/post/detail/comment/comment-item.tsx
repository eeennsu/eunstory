'use client'

import {
    requestCreatePostComment,
    requestDeletePostComment,
    requestEditPostComment,
} from '@/entities/post-comment/post-comment.api.client'
import { useProgressBar } from '@/lib/hooks'
import { Avatar, AvatarImage } from '@/lib/ui/avatar'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { FilePenLine, LoaderCircle, MessageCircleReply, Pencil, Trash, Undo2 } from 'lucide-react'
import { useState, type FC } from 'react'
import { ReplyItem } from './reply-item'
import { defaultUserIcon } from '@/shared/constants'
import { callToast } from '@/lib/fetch'
import { formatBeforeTime } from '@/lib/utils'
import { PostComment } from '@/entities/post-comment/post-comment.types'

interface Props {
    comment: PostComment
    currentUserId?: string
}

export const CommentItem: FC<Props> = ({ comment, currentUserId }) => {
    const { executeWithProgress, barRouter } = useProgressBar()

    const [editMode, setEditMode] = useState<'view' | 'edit'>('view')
    const [replyMode, setReplyMode] = useState<'view' | 'reply'>('view')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const [editedContent, setEditedContent] = useState<string>(comment.content)
    const [replyContent, setReplyContent] = useState<string>('')

    const isOwner = currentUserId === comment.author.id

    const isDisabled = isDeleting || isReplying

    const isValidateCheck = () => {
        if (!currentUserId) {
            callToast({
                type: 'NEED_AUTHENTICATE',
            })

            return false
        }

        return true
    }

    const handleEditComment = () => {
        if (!isValidateCheck()) return

        if (editMode === 'edit') {
            executeWithProgress(async () => {
                try {
                    await requestEditPostComment({
                        postId: comment.postId,
                        content: editedContent,
                        id: comment.id,
                        userId: currentUserId!,
                    })
                } catch (error) {
                    callToast({
                        title: '댓글 수정에 실패하였습니다.',
                        description: '관리자에게 문의해주세요.',
                        variant: 'destructive',
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
        if (!isValidateCheck()) return

        executeWithProgress(async () => {
            try {
                setIsDeleting(true)

                await requestDeletePostComment({
                    postId: comment.postId,
                    id: comment.id,
                    userId: currentUserId!,
                })
            } catch (error) {
                callToast({
                    title: '댓글 삭제에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                    variant: 'destructive',
                })
                console.error(error)
            } finally {
                setIsDeleting(false)
                barRouter.refresh()
            }
        })
    }

    const handleCreateReply = () => {
        if (!isValidateCheck()) return

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
                callToast({
                    title: '답글 작성에 실패하였습니다.',
                    description: '관리자에게 문의해주세요.',
                    variant: 'destructive',
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

    return (
        <li className='flex flex-col gap-4 p-2'>
            <section className='flex flex-col gap-3 rounded-lg bg-red-200 p-5'>
                <section className='flex w-full justify-between'>
                    <div className='flex gap-3 items-center'>
                        <Avatar>
                            <AvatarImage
                                src={comment?.author?.image || defaultUserIcon}
                                alt={comment?.author?.name}
                            />
                        </Avatar>
                        <div className='flex flex-col gap-1'>
                            <p>{comment?.author?.name}</p>
                            <div className='flex gap-2'>
                                <time>{formatBeforeTime(comment?.createdAt)}</time>
                                {comment?.updatedAt && <span>(수정됨)</span>}
                            </div>
                        </div>
                    </div>
                    {isOwner && (
                        <div className='flex items-center gap-3'>
                            {editMode === 'view' ? (
                                <Button
                                    size='icon-md'
                                    variant='outline'
                                    onClick={() => {
                                        replyMode === 'reply' && setReplyMode('view')
                                        setEditMode('edit')
                                    }}>
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
                                        onClick={handleEditComment}>
                                        <Pencil className='size-5' />
                                    </Button>
                                </>
                            )}
                            <Button
                                onClick={handleDeleteComment}
                                disabled={isDisabled}
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
                    <p>{comment?.content}</p>
                ) : (
                    <Textarea
                        className='w-full'
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                )}
            </section>

            <section className='flex flex-col gap-3'>
                <div className='flex flex-col gap-3 pl-7'>
                    {!!comment?.replies?.length && (
                        <div className='flex flex-col gap-4'>
                            {comment?.replies?.map((reply) => (
                                <ReplyItem
                                    key={reply.id}
                                    reply={reply}
                                    currentUserId={currentUserId}
                                    isOwner={isOwner}
                                />
                            ))}
                        </div>
                    )}
                    {replyMode === 'view' ? (
                        <Button
                            size='sm'
                            variant='outline'
                            className='w-fit gap-2'
                            onClick={() => {
                                editMode === 'edit' && setEditMode('view')
                                setReplyMode('reply')
                            }}>
                            답글 달기
                            <MessageCircleReply className='size-5' />
                        </Button>
                    ) : (
                        <>
                            <Button
                                size='sm'
                                variant='outline'
                                className='w-fit gap-2'
                                onClick={() => setReplyMode('view')}>
                                <Undo2 className='size-5' />
                            </Button>
                            <div className='flex gap-3'>
                                <Textarea
                                    className='w-full flex-1'
                                    placeholder='답글을 입력해주세요.'
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                />
                                <Button
                                    className='h-20'
                                    onClick={handleCreateReply}
                                    disabled={isDisabled}
                                    variant={isReplying ? 'loading' : 'default'}>
                                    {isReplying ? <LoaderCircle className='animate-spin' /> : '등록'}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </li>
    )
}
