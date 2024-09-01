import { serverRequestGetDetailPost } from '@/entities/post'
import { DeletePostButton } from '@/features/post'
import { getDateWithTime, textSanitizing } from '@/lib/utils'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const DetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const response = await serverRequestGetDetailPost({ id })

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
