'use client'

import { requestCreatePost } from '@/entities/post'
import { client } from '@/lib/axios/client-instance'
import { routePaths } from '@/lib/route'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Post } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState, type FC } from 'react'

export const PostForm: FC = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const { data } = useSession()
    const router = useRouter()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title?.length || !content?.length) {
            alert('제목과 내용은 필수입니다.')
            return
        }

        const authorId = data?.user['@id']

        if (!authorId) {
            alert('로그인이 필요합니다.')
            return
        }

        const body: Partial<Post> = {
            title,
            content,
            authorId,
        }

        try {
            const response = await requestCreatePost(body)

            if (response.status === 201 && response.data?.post) {
                alert('게시물이 생성되었습니다.')
                setTitle('')
                setContent('')
            } else {
                alert('게시물 생성에 실패했습니다')
            }
        } catch (error) {
            console.error(error)
            alert('게시물 생성에 실패했습니다')
        } finally {
            router.push(routePaths.post.list())
        }
    }

    return (
        <section className='flex w-full flex-1 bg-blue-300'>
            <form onSubmit={onSubmit}>
                <Input
                    className='w-72'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    className='w-72'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button>생성</Button>
            </form>
        </section>
    )
}
