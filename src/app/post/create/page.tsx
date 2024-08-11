import { PostForm, PostPreview } from '@/widgets/home'
import type { FC } from 'react'

const CreatePostPage: FC = () => {
    return (
        <main className='page-container'>
            <PostForm />
            <PostPreview />
        </main>
    )
}

export default CreatePostPage
