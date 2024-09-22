import { serverRequestGetAllPostList } from '@/entities/post'
import { TemporarySavedPostItem } from '@/features/post/temporary-saved'
import { getServerAuth } from '@/lib/auth'
import { routePaths } from '@/lib/route'
import { redirect } from 'next/navigation'
import type { FC } from 'react'

const TemporarySavedPostList: FC = async () => {
    const { isAdminAuthorized } = await getServerAuth()

    if (!isAdminAuthorized) {
        return redirect(routePaths.home())
    }

    const response = await serverRequestGetAllPostList({ isPublished: false })

    if ('error' in response) {
        return null
    }

    const temporarySavedPostList = response.posts

    return (
        <main className='mx-auto  w-full max-w-4xl bg-black'>
            <section className='flex flex-col gap-4 py-10 items-center'>
                {temporarySavedPostList.map((post) => (
                    <TemporarySavedPostItem
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        summary={post.summary}
                        createdAt={post.createdAt.toString()}
                    />
                ))}
            </section>
        </main>
    )
}

export default TemporarySavedPostList
