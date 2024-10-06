'use client'

import { ImagePlus, X } from 'lucide-react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/lib/ui/drawer'
import { Button } from '@/lib/ui/button'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { Input } from '@/lib/ui/input'
import { Textarea } from '@/lib/ui/textarea'
import { callToast } from '@/lib/fetch'
import { usePostPreviewStore } from '@/entities/post'
import { Badge } from '@/lib/ui/badge'

interface Props {
    triggerCheck: () => boolean
    trigger: ReactNode
    postTitle: string
    postSummary: string
    handleSubmit: () => void
    previewTags?: string[]
    prevThumbnail?: string | null
}

export const PostPreviewDrawer: FC<Props> = ({
    triggerCheck,
    trigger,
    postTitle,
    postSummary,
    handleSubmit,
    previewTags,
    prevThumbnail,
}) => {
    const [thumbnail, setThumbnail, isPreviewOpen, setIsPreviewOpen] = usePostPreviewStore((state) => [
        state.thumbnail,
        state.setThumbnail,
        state.isPreviewOpen,
        state.setIsPreviewOpen,
    ])

    const fileRef = useRef<HTMLInputElement>(null)
    const [summary, setSummary] = useState<string | undefined>(postSummary)

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return
        const file = e.target.files[0] // 파일을 배열로 변환하지 않고 바로 접근

        if (!file) return

        if (!file.type.startsWith('image/')) {
            callToast({
                variant: 'warning',
                position: 'top',
                title: '이미지 파일만 업로드 가능합니다.',
                description: '다시 시도해주세요.',
            })
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            setThumbnail((reader.result as string) || null)
        }
        reader.readAsDataURL(file)
    }

    const initialThumbnail = () => {
        setThumbnail(null)
        if (fileRef.current && fileRef.current?.value) {
            fileRef.current.value = ''
        }
    }

    useEffect(() => {
        prevThumbnail && setThumbnail(prevThumbnail)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevThumbnail])

    useEffect(() => {
        return () => {
            isPreviewOpen && setIsPreviewOpen(false)
            initialThumbnail()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Drawer
            open={isPreviewOpen}
            onOpenChange={(open) => {
                triggerCheck() && setIsPreviewOpen(open)
            }}>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className='p-7'>
                <div className='mx-auto w-full max-w-4xl'>
                    <DrawerHeader>
                        <DrawerTitle className='text-2xl font-bold text-gray-100'>포스트 미리보기</DrawerTitle>
                        <DrawerDescription className='text-sm text-gray-400'>
                            작성될 포스트의 요약과 썸네일을 지정해주세요.
                        </DrawerDescription>
                    </DrawerHeader>
                    <section className='flex gap-6 justify-between p-4'>
                        <figure className='flex flex-col gap-2 flex-1 h-[400px]'>
                            <figcaption className='text-sm text-gray-400'>썸네일 미리보기</figcaption>
                            <div className='bg-gray-700 flex-grow rounded-md flex flex-col justify-center items-center gap-5 border border-gray-600'>
                                {thumbnail ? (
                                    <div className='relative max-w-[390px] max-h-[280px] w-full flex-grow flex items-center'>
                                        <Button
                                            type='button'
                                            variant='link'
                                            className='size-9 p-0 absolute -right-1 -top-1 rounded-full bg-orange-600 text-gray-200 hover:brightness-150'
                                            onClick={initialThumbnail}>
                                            <X className='size-4' />
                                        </Button>
                                        <img
                                            src={thumbnail as string}
                                            alt='thumbnail'
                                            className='object-cover w-full h-full rounded-md max-w-full max-h-full'
                                        />
                                    </div>
                                ) : (
                                    <ImagePlus className='size-24 text-gray-500' />
                                )}
                                <Button
                                    variant='tertiary'
                                    onClick={() => {
                                        fileRef.current?.click()
                                    }}>
                                    썸네일 업로드
                                </Button>
                                <Input
                                    ref={fileRef}
                                    type='file'
                                    className='hidden'
                                    accept='image/*'
                                    onChange={handleThumbnailChange}
                                />
                            </div>
                        </figure>
                        <div className='flex flex-1 flex-col gap-10'>
                            <div className='max-w-full flex flex-col gap-2'>
                                <h2 className='text-gray-400 text-sm'>제목</h2>
                                <p className='text-2xl font-bold text-ellipsis line-clamp-1'>{postTitle}</p>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <h3 className='text-gray-400 text-sm'>태그</h3>
                                <div className='flex gap-2'>
                                    {!previewTags?.length ? (
                                        <p className='text-sm'>등록된 태그가 없습니다.</p>
                                    ) : (
                                        previewTags?.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant='outline'
                                                className='text-sm'>
                                                {tag}
                                            </Badge>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 flex-grow'>
                                <h3 className='text-gray-400 text-sm'>요약</h3>
                                <Textarea
                                    placeholder='포스트 요약을 작성해주세요.'
                                    variant={'secondary'}
                                    className='flex-grow'
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <DrawerFooter className='flex justify-between gap-4'>
                        <Button
                            type='submit'
                            size={'lg'}
                            className='flex-grow'>
                            작성하기
                        </Button>
                        <DrawerClose asChild>
                            <Button
                                variant='signature'
                                size={'lg'}
                                className='flex-grow'>
                                취소
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
