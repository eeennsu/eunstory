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
import { usePostPreviewStore } from '@/entities/post'
import { Badge } from '@/lib/ui/badge'
import { useToast } from '@/lib/hooks'

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
    const { toast } = useToast()

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return
        const file = e.target.files[0] // 파일을 배열로 변환하지 않고 바로 접근

        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast({
                type: 'error',
                title: '이미지 파일만 업로드 가능합니다.',
                description: '다시 시도해주세요.',
            })
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            const img = new Image()
            img.src = reader.result as string

            img.onload = () => {
                const targetWidth = 300
                const aspectRatio = img.height / img.width
                const targetHeight = targetWidth * aspectRatio

                const canvas = document.createElement('canvas')
                canvas.width = targetWidth
                canvas.height = targetHeight

                const ctx = canvas.getContext('2d')

                if (ctx) {
                    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
                    const resizedBase64 = canvas.toDataURL('image/jpeg', 1)

                    setThumbnail(resizedBase64)
                } else {
                    toast({
                        type: 'error',
                        title: '썸네일 업로드에 실패했습니다.',
                        description: '다시 시도해주세요.',
                    })
                }
            }
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
            <DrawerContent className='py-10 bg-gray-950'>
                <div className='mx-auto w-full max-w-4xl'>
                    <DrawerHeader>
                        <DrawerTitle className='text-3xl font-semibold text-gray-100'>포스트 미리보기</DrawerTitle>
                        <DrawerDescription className='text-sm text-gray-500 mt-1'>
                            작성될 포스트의 요약과 썸네일을 지정해주세요.
                        </DrawerDescription>
                    </DrawerHeader>
                    <section className='flex gap-8 justify-between p-6'>
                        <figure className='flex flex-col gap-3 flex-1 h-[400px]'>
                            <figcaption className='text-sm text-gray-500'>썸네일 미리보기</figcaption>
                            <div className='bg-gray-800 flex-grow rounded-md flex flex-col justify-center items-center gap-5 border border-gray-600 shadow-lg'>
                                {thumbnail ? (
                                    <div className='relative max-w-[390px] max-h-[280px] w-full flex-grow flex items-center'>
                                        <Button
                                            type='button'
                                            variant='link'
                                            className='size-9 p-0 absolute -right-3 -top-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition'
                                            onClick={initialThumbnail}>
                                            <X className='size-5' />
                                        </Button>
                                        <img
                                            src={thumbnail as string}
                                            alt='thumbnail'
                                            className='object-cover w-full h-full rounded-md shadow-md'
                                        />
                                    </div>
                                ) : (
                                    <ImagePlus className='size-28 text-gray-500' />
                                )}
                                <Button
                                    variant='tertiary'
                                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md'
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
                        <div className='flex flex-1 flex-col gap-6'>
                            <div className='max-w-full flex flex-col gap-1'>
                                <h2 className='text-gray-500 text-sm'>제목</h2>
                                <p className='text-2xl font-semibold text-white line-clamp-1'>{postTitle}</p>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <h3 className='text-gray-500 text-sm'>태그</h3>
                                <div className='flex gap-2'>
                                    {!previewTags?.length ? (
                                        <p className='text-sm text-gray-500'>등록된 태그가 없습니다.</p>
                                    ) : (
                                        previewTags?.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant='outline'
                                                className='text-sm text-gray-200 bg-gray-700'>
                                                {tag}
                                            </Badge>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col gap-1 flex-grow'>
                                <h3 className='text-gray-500 text-sm'>요약</h3>
                                <Textarea
                                    placeholder='포스트 요약을 작성해주세요.'
                                    variant='secondary'
                                    className='flex-grow text-gray-200 bg-gray-800 rounded-md border border-gray-600'
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <DrawerFooter className='flex justify-between gap-4'>
                        <Button
                            onClick={handleSubmit}
                            size='lg'
                            className=' bg-blue-600 text-white hover:bg-blue-700 rounded-md transition'>
                            작성하기
                        </Button>
                        <DrawerClose asChild>
                            <Button
                                variant='outline'
                                size='lg'
                                className=' text-gray-400 border border-gray-600 bg-gray-800 hover:bg-gray-700 rounded-md transition'>
                                취소
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
