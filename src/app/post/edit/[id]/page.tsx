import { requestGetDetailPost } from '@/entities/post'
import { PostFormWidget } from '@/widgets/post/common'
import type { FC } from 'react'

interface Props {
    params: {
        id: string
    }
}

const EditDetailPostPage: FC<Props> = async ({ params: { id } }) => {
    const response = await requestGetDetailPost({ id })

    if (!('post' in response)) {
        throw response.error
    }

    const { post } = response

    return (
        <main>
            <PostFormWidget />
        </main>
    )
}

export default EditDetailPostPage
