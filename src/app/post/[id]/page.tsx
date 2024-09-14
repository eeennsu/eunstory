import { ResponseGetPostIdListType } from '@/app/api/post/id-list/route'
import { serverRequestGetDetailPost, serverRequestGetPostIdList } from '@/entities/post'
import { DeletePostButton } from '@/features/post'
import { getDateWithTime, textSanitizing } from '@/lib/utils'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const DetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const response = await serverRequestGetDetailPost({ id, isPublished: true })

    if (!('post' in response)) {
        throw new Error('Post not found')
    }

    const { post } = response

    return (
        <main className='page-container'>
            <article className='flex flex-col items-center'>
                <h1 className='text-5xl font-bold'>{post.title}</h1>
                <section
                    className='tiptap-editor-content'
                    dangerouslySetInnerHTML={{ __html: textSanitizing(post.content) }}
                />
                {post.createdAt && <div>{getDateWithTime(post.createdAt)}</div>}
                <DeletePostButton id={id} />
            </article>
        </main>
    )
}

export default DetailPostPage

export const generateStaticParams = async () => {
    const response = (await serverRequestGetPostIdList()) as ResponseGetPostIdListType

    if ('error' in response) return []

    return response.ids
}

export const revalidate = 60 * 60 * 4 // 4 hours
export const dynamicParams = true
