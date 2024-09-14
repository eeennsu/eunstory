import { ResponseGetPostIdListType } from '@/app/api/post/id-list/route'
import { serverRequestGetDetailPost, serverRequestGetPostIdList } from '@/entities/post'
import { UserCommentWidget } from '@/widgets/post/detail'
import { DetailPostWidget } from '@/widgets/post/detail/detail-post-widget'
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

    const post = response?.post

    return (
        <main className='page-container'>
            <article className='flex flex-col gap-3'>
                <DetailPostWidget post={post} />
                <UserCommentWidget />
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
