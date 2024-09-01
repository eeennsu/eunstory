'use client'

import { requestCreatePost, requestEditPost } from '@/entities/post'
import { TagInput, TagInputRef } from '@/features/common/tag-input'
import { TiptapEditor, TiptapRefType } from '@/features/common/tiptap-editor'
import { useAdminAuth, useProgressBar } from '@/lib/hooks'
import { useDebouncedValue } from '@/lib/hooks/use-debounced-value'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import { Input } from '@/shared/common'
import { useToast } from '@/lib/ui/use-toast'
import { Post } from '@prisma/client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState, type FC } from 'react'

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
    const debouncedPost = useDebouncedValue(
        { title, content: editorRef.current?.getHtml(), tags: tagInputRef.current?.getTags() },
        5000
    )

    const isValidateForm = () => {
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

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isValidateForm()) return

        const tags = tagInputRef.current?.getTags().join(';') || ''

        executeWithProgress(async () => {
            const post: Partial<Post> = {
                title,
                content: editorRef.current?.getHtml() as string,
                ...(tags.length > 0 && { tags }),
                authorId,
                isPublished: true,
            }

            try {
                const response = await requestCreatePost({ post })

                if ('post' in response) {
                    alert('게시물이 생성되었습니다')
                } else {
                    alert('게시물 생성에 실패했습니다')
                }
            } catch (error) {
                console.error(error)
                alert('게시물 생성에 실패했습니다')
            } finally {
                barRouter.replace(routePaths.post.list())
            }
        })
    }

    const temporarySavePost = useCallback(async () => {
        if (!title.length || editorRef.current?.isEmpty()) return

        let isSaved

        const tags = tagInputRef.current?.getTags().join(';') || ''

        const post: Partial<Post> = {
            title,
            content: editorRef.current?.getHtml() as string,
            tags: tags.length > 0 ? tags : undefined,
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
            const temporarySavedPost = await requestCreatePost({
                post: {
                    ...post,
                    authorId,
                    isPublished: false,
                },
            })

            if ('post' in temporarySavedPost) {
                const url = new URL(pathname, window.location.origin)
                url.searchParams.set('id', temporarySavedPost.post.id)

                router.replace(url.toString())

                isSaved = true
            }
        }

        if (isSaved) {
            toast({
                title: '포스트가 임시 저장되었습니다.',
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPost, temporarySavedPostId, temporarySavedPostId, authorId])

    const preventEnterInInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    useEffect(() => {
        temporarySavePost()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPost])

    return (
        <section className='flex w-full flex-1 flex-col bg-blue-200 items-center justify-center'>
            <form
                onSubmit={onSubmit}
                className='flex flex-col gap-4 flex-1 py-10'>
                <Input
                    className='w-full text-2xl h-16 font-semibold'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='제목을 입력해주세요'
                    onKeyDown={preventEnterInInput}
                />

                <TagInput
                    ref={tagInputRef}
                    className='w-full h-12'
                    placeholder='태그를 엔터로 할것입니다!!'
                    onKeyDown={preventEnterInInput}
                />

                <TiptapEditor
                    ref={editorRef}
                    isAllToolbar
                    placeholder='내용을 입력해주세요'
                />

                <Button type='submit'>생성</Button>
            </form>
        </section>
    )
}
