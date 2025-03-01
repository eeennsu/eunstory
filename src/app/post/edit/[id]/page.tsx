import { serverRequestGetDetailPost } from '@/entities/post'
import { PostFormWidget } from '@/widgets/post/common'
import { Suspense, type FC } from 'react'

interface Props {
    params: Promise<{
        id: string
    }>
}

const EditDetailPostPage: FC<Props> = async ({ params }) => {
    const id = (await params)?.id
    const responseDetailPost = await serverRequestGetDetailPost({ postId: id, isPublished: true })

    if ('error' in responseDetailPost) {
        throw responseDetailPost.error
    }

    return (
        <main className='page-container pt-24'>
            <Suspense>
                <PostFormWidget prevPost={responseDetailPost.post} />
            </Suspense>
        </main>
    )
}

export default EditDetailPostPage
