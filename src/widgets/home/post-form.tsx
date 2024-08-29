'use client'

import { requestCreatePost, requestEditPost } from '@/entities/post'
import { useAdminAuth, useAsync, useProgressBar } from '@/lib/hooks'
import { useDebouncedValue } from '@/lib/hooks/use-debounced-value'
import { routePaths } from '@/lib/route'
import { Button } from '@/lib/ui/button'
import { Input } from '@/lib/ui/input'
import { Label } from '@/lib/ui/label'
import { useToast } from '@/lib/ui/use-toast'
import { Post } from '@prisma/client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'

export const PostForm: FC = () => {
    const route = useRouter()
    const params = useSearchParams()
    const pathname = usePathname()
    const temporarySavedPostId = params.get('id')
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])

    const { adminId: authorId } = useAdminAuth()
    const { executeWithProgress, router } = useProgressBar()
    const { toast } = useToast()

    const debouncedPost = useDebouncedValue<{ title: string; content: string }>({ title, content }, 2500)

    const onSubmit = async () => {
        if (!title.length && !content.length) {
            toast({
                title: '제목과 내용을 입력해주세요.',
            })
            return
        }

        if (!title.length) {
            toast({
                title: '제목을 입력해주세요.',
            })
            return
        }

        if (!content.length) {
            toast({
                title: '내용을 입력해주세요.',
            })
            return
        }

        if (!authorId) {
            toast({
                title: '인증이 필요합니다.',
            })
            return
        }

        executeWithProgress(async () => {
            const body: Partial<Post> = {
                title,
                content,
                authorId,
                isPublished: true,
            }

            try {
                const response = await requestCreatePost({ post: body })

                if ('post' in response) {
                    alert('게시물이 생성되었습니다')
                } else {
                    alert('게시물 생성에 실패했습니다')
                }
            } catch (error) {
                console.error(error)
                alert('게시물 생성에 실패했습니다')
            } finally {
                router.replace(routePaths.post.list())
            }
        })
    }

    // TODO: 임시저장 기능 구현하긴 했는데, 왜 이게 자꾸 연속으로 호출되지.... 객체로 해서 문제인가.. ㅠㅠ 일단 자자
    useAsync(async () => {
        const { title: debouncedTitle, content: debouncedContent } = debouncedPost
        if (!debouncedTitle.length || !debouncedContent.length) return

        let isSaved

        // 임시 저장된 포스트가 있으면? 임시저장된 포스트 내용 변경하며 임시저장
        if (!!temporarySavedPostId) {
            const updatedTemporarySavedPost = await requestEditPost({
                id: temporarySavedPostId,
                post: {
                    title: debouncedTitle,
                    content: debouncedContent,
                    ...(tags.length > 0 && { tags: tags.join(';') }),
                },
            })

            if ('post' in updatedTemporarySavedPost) {
                isSaved = true
            }
        }

        // 임시 저장된 포스트가 없으면? 새로운 포스트 생성하며 임시저장
        else {
            const temporarySavedPost = await requestCreatePost({
                post: {
                    title: debouncedTitle,
                    content: debouncedContent,
                    authorId,
                    isPublished: false,
                    ...(tags.length > 0 && { tags: tags.join(';') }),
                },
            })

            if ('post' in temporarySavedPost) {
                const url = new URL(pathname, window.location.origin)
                url.searchParams.set('id', temporarySavedPost.post.id)

                route.replace(url.toString())

                isSaved = true
            }
        }

        if (isSaved) {
            toast({
                title: '포스트가 임시 저장되었습니다.',
            })
        }
    }, [debouncedPost])

    return (
        <section className='flex w-full flex-1 bg-blue-200 items-center justify-center'>
            <form
                action={onSubmit}
                className='flex flex-col gap-4'>
                <Label>
                    <span>제목</span>
                    <Input
                        className='w-72'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Label>
                <Label>
                    <span>내용</span>
                    <Input
                        className='w-72'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Label>

                <Button>생성</Button>
            </form>
        </section>
    )
}
