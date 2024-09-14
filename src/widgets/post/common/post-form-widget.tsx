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
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState, type FC } from 'react'
import { Tooltip, TooltipContent, TooltipProvider } from '@/lib/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { Ellipsis } from 'lucide-react'

interface Props {
    prevPost?: Post // prevPost 가 있으면 수정 폼, 없으면 생성 폼
}

export const PostFormWidget: FC<Props> = ({ prevPost }) => {
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
                authorId,
                ...(tags.length > 0 && { tags }),
            }

            const toastKeyword = prevPost ? '수정' : '생성'

            try {
                let response

                if (prevPost) {
                    response = await requestEditPost({
                        id: prevPost.id,
                        post,
                    })
                } else {
                    response = await requestCreatePost({
                        post: {
                            ...post,
                            order: null,
                        },
                    })
                }

                if (response) {
                    toast({ title: `게시물이 ${toastKeyword}되었습니다` })
                } else {
                    toast({ title: `게시물 ${toastKeyword}에 실패하였습니다.`, description: '다시 시도해주세요.' })
                }
            } catch (error) {
                console.error(error)
                toast({ title: `게시물 ${toastKeyword}에 실패하였습니다.`, description: '다시 시도해주세요.' })
            } finally {
                barRouter.replace(routePaths.post.list())
                barRouter.refresh()
            }
        })
    }

    // 임시저장 함수
    const temporarySavePost = useCallback(async () => {
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
                    order: null,
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
    }, [title, content, temporarySavedPostId])

    // 엔터 입력시 submit 이벤트 방지
    const preventEnterInInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    // 제목 또는 내용이 변경되면 임시저장
    useEffect(() => {
        if (prevPost || !title.length || !content.length) return

        if (!isSelfTemporarySaved) {
            temporarySavePost()
        } else {
            setIsSelfTemporarySaved(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPost])

    // 만약 수정페이지라면 기존 포스트 정보를 가져와서 렌더링
    useEffect(() => {
        if (!prevPost) return

        setTitle(prevPost.title)
        setContent(prevPost.content)

        prevPost.tags && tagInputRef.current?.setTagValues(prevPost.tags.split(','))
    }, [prevPost])

    const { isLoading } = useAsync(async () => {
        if (!temporarySavedPostId || prevPost) return

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
    }, [temporarySavedPostId])

    return (
        <>
            {isLoading && (
                <section className='flex w-full h-full items-center justify-center flex-grow'>
                    <div className='w-full flex justify-center'>
                        <Ellipsis className='size-8 animate-ping' />
                    </div>
                </section>
            )}
            <section
                className={cn(
                    'w-full flex-1 flex-col bg-blue-200 items-center justify-center',
                    isLoading ? 'hidden' : 'flex'
                )}>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4 flex-1 py-10'>
                    <Input
                        className='w-full text-2xl h-16 font-semibold'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='제목을 입력해주세요.'
                        onKeyDown={preventEnterInInput}
                    />
                    <TooltipProvider delayDuration={100}>
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
                            <TooltipContent className='absolute left-[84px] top-6 w-[290px]'>
                                쉼표 혹은 엔터를 입력하면 태그가 등록됩니다. <br /> 클릭하면 삭제됩니다.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TiptapEditor
                        ref={editorRef}
                        isAllToolbar
                        placeholder='내용을 입력해주세요.'
                        onUpdate={({ editor }) => setContent(editor.getHTML())}
                        previousContent={prevPost?.content}
                    />

                    <div className='flex gap-4 justify-end'>
                        {prevPost ? (
                            <Button
                                type='button'
                                variant={'secondary'}
                                onClick={() => {
                                    router.replace(routePaths.post.detail(prevPost.id))
                                }}>
                                뒤로 가기
                            </Button>
                        ) : (
                            <Button
                                type='button'
                                variant='secondary'
                                onClick={() => {
                                    temporarySavePost()
                                    setIsSelfTemporarySaved(true)
                                }}>
                                임시 저장
                            </Button>
                        )}
                        <Button type='submit'>{prevPost ? '수정하기' : '작성하기'}</Button>
                    </div>
                </form>
            </section>
        </>
    )
}
