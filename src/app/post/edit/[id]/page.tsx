import { serverRequestGetDetailPost } from '@/entities/post'
import { PostFormWidget } from '@/widgets/post/common'
import { Suspense, type FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const EditDetailPostPage: FC<Props> = async ({ params: { id } }) => {
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
