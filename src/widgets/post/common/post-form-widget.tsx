'use client'

import { requestCreatePost, requestEditPost, requestGetDetailPost } from '@/entities/post'
import { TagInput, TagInputRef } from '@/features/common/tag-input'
import { TiptapEditor, TiptapRefType } from '@/features/common/tiptap-editor'
import { useAdminSession, useAsync, useProgressBar } from '@/lib/hooks'
import { useDebouncedValue } from '@/lib/hooks/use-debounced-value'
import { mainPath } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import { Input } from '@/shared/common'
import { Post } from '@prisma/client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { KeyboardEvent, useEffect, useMemo, useRef, useState, type FC } from 'react'
import { Tooltip, TooltipContent, TooltipProvider } from '@/lib/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { cn } from '@/lib/shadcn/shadcn-utils'
import { Ellipsis } from 'lucide-react'
import { callToast } from '@/lib/fetch'
import { PostPreviewDrawer } from '@/features/post/create'
import { usePostPreviewStore } from '@/entities/post'

interface Props {
    prevPost?: Post // prevPost 가 있으면 수정 폼, 없으면 생성 폼
}

export const PostFormWidget: FC<Props> = ({ prevPost }) => {
    const router = useRouter()
    const params = useSearchParams()
    const pathname = usePathname()
    const temporarySavedPostId = params.get('id')

    const { adminId: authorId, isAdminAuthorized } = useAdminSession()
    const { executeWithProgress, barRouter } = useProgressBar()

    const [thumbnail, isPreviewOpen] = usePostPreviewStore((state) => [state.thumbnail, state.isPreviewOpen])

    const editorRef = useRef<TiptapRefType>(null)
    const tagInputRef = useRef<TagInputRef>(null)

    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [isSelfTemporarySaved, setIsSelfTemporarySaved] = useState<boolean>(false)
    const summary = useMemo<string>(
        () => editorRef.current?.getText().slice(0, 100) || '',

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [editorRef.current?.getText()]
    )

    const debouncedPost = useDebouncedValue({ title, content }, 7000)
    const [previewTags, setPreviewTags] = useState<string[]>([])

    const isValidatedForm = () => {
        if (!authorId || !isAdminAuthorized) {
            callToast({
                type: 'FORBIDDEN',
                variant: 'destructive',
            })

            return false
        }

        if (!title.length && editorRef.current?.isEmpty()) {
            callToast({
                title: '제목과 내용을 입력해주세요.',
            })

            return false
        }

        if (!title.length) {
            callToast({
                title: '제목을 입력해주세요.',
            })

            return false
        }

        if (editorRef.current?.isEmpty()) {
            callToast({
                title: '내용을 입력해주세요.',
            })

            return false
        }

        return true
    }

    // 제출 함수
    const handleSubmit = async () => {
        if (!isValidatedForm()) return

        const tags = tagInputRef.current?.getTags().join(',') || ''
        const toastKeyword = prevPost ? '수정' : '생성'

        executeWithProgress(async () => {
            try {
                let response

                if (prevPost) {
                    response = await requestEditPost({
                        postId: prevPost.id,
                        editedPost: {
                            title,
                            content,
                            tags: tags || null,
                            authorId: authorId!,
                            thumbnail,
                        },
                    })
                } else {
                    // 임시 저장된 기존 포스트라면? 임시저장된 포스트를 수정
                    if (!!temporarySavedPostId) {
                        response = await requestEditPost({
                            postId: temporarySavedPostId,
                            editedPost: {
                                title,
                                content: content !== '' ? content : editorRef.current?.getHtml(), // '' 일때는, 임시저장 리스트에서 작성 폼에 작성한 경우임.
                                tags: tags || null,
                                authorId: authorId!,
                                order: -1,
                            },
                        })

                        // 임시 저장된 포스트가 아니라면? 새로운 포스트 생성
                    } else {
                        response = await requestCreatePost({
                            title,
                            content,
                            authorId: authorId!,
                            tags: tags || null,
                            order: -1,
                            summary,
                            thumbnail,
                        })
                    }
                }

                if (response) {
                    callToast({ title: `게시물이 ${toastKeyword}되었습니다` })
                } else {
                    callToast({
                        title: `게시물 ${toastKeyword}에 실패하였습니다.`,
                        description: '다시 시도해주세요.',
                        variant: 'destructive',
                    })
                }
            } catch (error) {
                callToast({
                    title: `게시물 ${toastKeyword}에 실패하였습니다.`,
                    description: '다시 시도해주세요.',
                    variant: 'destructive',
                })
                console.error(error)
            } finally {
                barRouter.replace(mainPath.post.list())
                barRouter.refresh()
            }
        })
    }

    // 임시저장 함수
    const temporarySavePost = async () => {
        if (!authorId) return

        let isSaved

        const tags = tagInputRef.current?.getTags().join(',') || null
        const content = editorRef.current?.getHtml() || ''

        // 임시 저장된 포스트가 있으면? 임시저장된 포스트 내용 변경하며 임시저장
        if (!!temporarySavedPostId) {
            const updatedTemporarySavedPost = await requestEditPost({
                postId: temporarySavedPostId,
                editedPost: {
                    title,
                    content,
                    tags,
                    summary,
                },
            })

            if ('post' in updatedTemporarySavedPost) {
                isSaved = true
            }
        }

        // 임시 저장된 포스트가 없으면? 새로운 포스트 생성하며 임시저장
        else {
            const temporarySavedResponse = await requestCreatePost({
                title,
                content,
                tags,
                authorId,
                order: null,
                thumbnail: null,
                summary,
            })

            if ('postId' in temporarySavedResponse) {
                const url = new URL(pathname, window.location.origin)
                url.searchParams.set('id', temporarySavedResponse.postId)

                router.replace(url.toString())

                isSaved = true
            }
        }

        if (isSaved) {
            callToast({
                title: '포스트가 임시 저장되었습니다.',
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    // 엔터 입력시 submit 이벤트 방지
    const preventEnterInInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    const isPreviewReady = () => {
        if (!title.length || editorRef.current?.isEmpty()) {
            callToast({
                title: '제목과 내용을 모두 입력해주세요.',
            })
            return false
        }

        setPreviewTags(tagInputRef.current?.getTags() || [])
        return true
    }

    // 제목 또는 내용이 변경되면 임시저장
    useEffect(() => {
        if (prevPost || !title.length || !content.length || isPreviewOpen) return

        if (!isSelfTemporarySaved) {
            temporarySavePost()
        } else {
            setIsSelfTemporarySaved(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPost, isPreviewOpen])

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
            postId: temporarySavedPostId,
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
                className={cn('w-full flex-1 flex-col items-center justify-center', isLoading ? 'hidden' : 'flex')}>
                <form className='flex flex-col gap-4 flex-1 py-10 text-black'>
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
                                    router.replace(mainPath.post.detail(prevPost.id))
                                }}>
                                뒤로 가기
                            </Button>
                        ) : (
                            <Button
                                type='button'
                                variant='secondary'
                                onClick={() => {
                                    if (prevPost || !title.length || !content.length) return

                                    temporarySavePost()
                                    setIsSelfTemporarySaved(true)
                                }}>
                                임시 저장
                            </Button>
                        )}
                        <PostPreviewDrawer
                            key={editorRef.current?.getText()}
                            triggerCheck={isPreviewReady}
                            trigger={<Button type='button'>{prevPost ? '수정하기' : '작성하기'}</Button>}
                            postTitle={title}
                            postSummary={summary}
                            handleSubmit={handleSubmit}
                            prevThumbnail={prevPost?.thumbnail}
                            previewTags={previewTags}
                        />
                    </div>
                </form>
            </section>
        </>
    )
}
