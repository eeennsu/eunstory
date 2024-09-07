'use client'

import { requestCreatePost, requestEditPost, requestGetDetailPost } from '@/entities/post'
import { TagInput, TagInputRef } from '@/features/common/tag-input'
import { TiptapEditor, TiptapRefType } from '@/features/common/tiptap-editor'
import { useAdminAuth, useAsync, useProgressBar } from '@/lib/hooks'
import { useDebouncedValue } from '@/lib/hooks/use-debounced-value'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import { Input } from '@/shared/common'
import { useToast } from '@/lib/ui/use-toast'
import { Post } from '@prisma/client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { FormEvent, KeyboardEvent, useEffect, useRef, useState, type FC } from 'react'
import { Tooltip, TooltipContent, TooltipProvider } from '@/lib/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

export const PostForm: FC = () => {
    const router = useRouter()
    const params = useSearchParams()
    const pathname = usePathname()
    const temporarySavedPostId = params.get('id')

    const { adminId: authorId } = useAdminAuth()
    const { executeWithProgress, barRouter } = useProgressBar()
    const { toast } = useToast()

    const editorRef = useRef<TiptapRefType>(null)
    const tagInputRef = useRef<TagInputRef>(null)

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [isSelfTemporarySaved, setIsSelfTemporarySaved] = useState<boolean>(false)

    const debouncedPost = useDebouncedValue({ title, content }, 5000)

    const isValidatedForm = () => {
        if (!authorId) {
            toast({
                title: '인증이 필요합니다.',
            })

            return false
        }

        if (!title.length && editorRef.current?.isEmpty()) {
            toast({
                title: '제목과 내용을 입력해주세요.',
            })

            return false
        }

        if (!title.length) {
            toast({
                title: '제목을 입력해주세요.',
            })

            return false
        }

        if (editorRef.current?.isEmpty()) {
            toast({
                title: '내용을 입력해주세요.',
            })

            return false
        }

        return true
    }

    // 제출 함수
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isValidatedForm()) return

        const tags = tagInputRef.current?.getTags().join(',') || ''

        executeWithProgress(async () => {
            const post: Partial<Post> = {
                title,
                content,
                ...(tags.length > 0 && { tags }),
                authorId,
                isPublished: true,
            }

            try {
                const response = await requestCreatePost({ post })

                if (response) {
                    toast({ title: '게시물이 생성되었습니다.' })
                } else {
                    toast({ title: '게시물 생성에 실패하였습니다.', description: '다시 시도해주세요.' })
                }
            } catch (error) {
                console.error(error)
                toast({ title: '게시물 생성에 실패하였습니다.', description: '다시 시도해주세요.' })
            } finally {
                barRouter.replace(routePaths.post.list())
            }
        })
    }

    // 임시저장 함수
    const temporarySavePost = async () => {
        let isSaved

        const tags = tagInputRef.current?.getTags().join(',') || ''

        const post: Partial<Post> = {
            title,
            content: editorRef.current?.getHtml() || '',
            ...(tags.length > 0 && { tags }),
        }

        // 임시 저장된 포스트가 있으면? 임시저장된 포스트 내용 변경하며 임시저장
        if (!!temporarySavedPostId) {
            const updatedTemporarySavedPost = await requestEditPost({
                id: temporarySavedPostId,
                post,
            })

            if ('post' in updatedTemporarySavedPost) {
                isSaved = true
            }
        }

        // 임시 저장된 포스트가 없으면? 새로운 포스트 생성하며 임시저장
        else {
            const temporarySavedResponse = await requestCreatePost({
                post: {
                    ...post,
                    authorId,
                    isPublished: false,
                },
            })

            if ('postId' in temporarySavedResponse) {
                const url = new URL(pathname, window.location.origin)
                url.searchParams.set('id', temporarySavedResponse.postId)

                router.replace(url.toString())

                isSaved = true
            }
        }

        if (isSaved) {
            toast({
                title: '포스트가 임시 저장되었습니다.',
            })
        }
    }

    // 엔터 입력시 submit 이벤트 방지
    const preventEnterInInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    // 제목 또는 내용이 변경되면 임시저장
    useEffect(() => {
        if (!title.length || !content.length) return

        if (!isSelfTemporarySaved) {
            temporarySavePost()
        } else {
            setIsSelfTemporarySaved(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPost])

    const { isLoading } = useAsync(async () => {
        if (temporarySavedPostId) {
            const fetchTemporarySavedPost = await requestGetDetailPost({
                id: temporarySavedPostId,
                isPublished: false,
            })

            if ('post' in fetchTemporarySavedPost) {
                const { post } = fetchTemporarySavedPost

                setTitle(post.title)
                editorRef.current?.setContent(post.content)
                post.tags && tagInputRef.current?.setTagValues(post.tags.split(','))
            }
        }
    }, [temporarySavedPostId])

    return (
        <section className='flex w-full flex-1 flex-col bg-blue-200 items-center justify-center'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 flex-1 py-10'>
                {!isLoading && (
                    <>
                        <Input
                            className='w-full text-2xl h-16 font-semibold'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='제목을 입력해주세요.'
                            onKeyDown={preventEnterInInput}
                        />

                        <TooltipProvider delayDuration={300}>
                            <Tooltip defaultOpen>
                                <TooltipTrigger
                                    type='button'
                                    className='relative'>
                                    <TagInput
                                        ref={tagInputRef}
                                        className='w-full h-12'
                                        placeholder='태그를 입력해주세요.'
                                        onKeyDown={preventEnterInInput}
                                    />
                                </TooltipTrigger>
                                <TooltipContent className='absolute left-[84px] top-6 w-[320px]'>
                                    쉼표 혹은 엔터를 입력하면 태그가 등록됩니다. <br /> 클릭하면 삭제됩니다.
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                )}

                <TiptapEditor
                    ref={editorRef}
                    isAllToolbar
                    placeholder='내용을 입력해주세요.'
                    onUpdate={({ editor }) => setContent(editor.getHTML())}
                />

                {!isLoading && (
                    <div className='flex gap-4 justify-end'>
                        <Button
                            type='button'
                            variant='secondary'
                            onClick={() => {
                                temporarySavePost()
                                setIsSelfTemporarySaved(true)
                            }}>
                            임시 저장
                        </Button>
                        <Button type='submit'>작성하기</Button>
                    </div>
                )}
            </form>
        </section>
    )
}
