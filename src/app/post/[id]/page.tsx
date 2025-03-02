import { serverRequestGetDetailPost, serverRequestGetSomePostList } from '@/entities/post'
import { UserCommentWidget, DetailPostWidget, PostNavigationWidget } from '@/widgets/post/detail'
import type { FC } from 'react'

interface Props {
    params: Promise<{
        id: string
    }>
}

const DetailPostPage: FC<Props> = async ({ params }) => {
    const id = (await params)?.id
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

export const generateStaticParams = async () => {
    const responsePosts = await serverRequestGetSomePostList({
        curPage: 1,
        perPage: 5,
        isPublished: true,
    })

    if ('error' in responsePosts) {
        return []
    }

    return responsePosts?.posts.map((post) => ({
        id: post?.id || '',
    }))
}
