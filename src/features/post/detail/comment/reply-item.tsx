'use client'

import { callToast } from '@/lib/fetch'
import { useProgressBar } from '@/lib/hooks'
import { Avatar, AvatarImage } from '@/lib/ui/avatar'
import { Button } from '@/lib/ui/button'
import { Textarea } from '@/lib/ui/textarea'
import { defaultUserIcon } from '@/shared/constants'
import dayjs from 'dayjs'
import { FilePenLine, LoaderCircle, Pencil, Trash, Undo2 } from 'lucide-react'
import { useState, type FC } from 'react'

interface Props {
    authorImage: string | null
    authorName: string
    content: string
    createdAt: Date
    isOwner: boolean
}

export const ReplyItem: FC<Props> = ({ authorImage, authorName, content, createdAt, isOwner }) => {
    const { executeWithProgress, barRouter } = useProgressBar()

    const [editedContent, setEditedContent] = useState<string>(content)
    const [editMode, setEditMode] = useState<'view' | 'edit'>('view')
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const handleEditReply = () => {
        executeWithProgress(async () => {
            try {



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

    const handleDeleteReply = () => {}

    return (
        <section className='flex flex-col gap-3 rounded-lg bg-indigo-200 p-5'>
            <section className='flex w-full justify-between'>
                <div className='flex gap-3 items-center'>
                    <Avatar>
                        <AvatarImage
                            src={authorImage || defaultUserIcon}
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
                <p>{content}</p>
            ) : (
                <Textarea
                    className='w-full'
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                />
            )}
        </section>
    )
}
