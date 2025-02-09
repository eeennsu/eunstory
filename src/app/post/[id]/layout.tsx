import { serverRequestGetDetailPost } from '@/entities/post'
import { FloatingMenu } from '@/features/post/detail/post'
import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
    const postId = params.id
    const responsePost = await serverRequestGetDetailPost({ postId: postId, isPublished: true })

    if ('error' in responsePost) {
        return {
            title: '방은수 블로그',
        }
    }

    return {
        title: responsePost.post.title,
        description: responsePost.post.summary,
    }
}

const DetailPostLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <FloatingMenu scrollThreshold={150} />
            {children}
        </>
    )
}

export default DetailPostLayout
