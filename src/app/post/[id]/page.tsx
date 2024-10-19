import { serverRequestGetDetailPost } from '@/entities/post'
import { UserCommentWidget, DetailPostWidget, PostNavigationWidget } from '@/widgets/post/detail'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const DetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const responseDetailPost = await serverRequestGetDetailPost({ postId: id, isPublished: true })

    if ('error' in responseDetailPost) {
        throw responseDetailPost.error
    }

    const post = responseDetailPost?.post

    return (
        <main className='page-container gap-10 mx-auto max-w-screen-lg w-full pt-[130px] pb-6'>
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

// export const generateStaticParams = async () => {
//     const responsePostIds = (await serverRequestGetPostIdList()) as ResponseGetPostIdListType

//     if ('error' in responsePostIds) return []

//     return responsePostIds.ids
// }

// export const revalidate = 60 * 60 * 4 // 4 hours
