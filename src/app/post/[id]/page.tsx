import { ResponseGetPostIdListType } from '@/app/api/post/id-list/route'
import { serverRequestGetDetailPost, serverRequestGetPostIdList } from '@/entities/post'
import { Separator } from '@/lib/ui/separator'
import { UserCommentWidget, DetailPostWidget, PostNavigationWidget } from '@/widgets/post/detail'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const DetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const response = await serverRequestGetDetailPost({ postId: id, isPublished: true })

    if (!('post' in response)) {
        throw new Error('Post not found')
    }

    const post = response?.post

    return (
        <main className='page-container gap-10 mx-auto max-w-screen-lg w-full pt-[120px] pb-6'>
            <DetailPostWidget post={post} />

            <section className='flex flex-col gap-5'>
                <PostNavigationWidget
                    id={id}
                    order={post.order as number}
                />
                <UserCommentWidget postId={id} />
            </section>
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
