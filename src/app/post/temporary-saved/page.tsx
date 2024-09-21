import { serverRequestGetAllPostList } from '@/entities/post'
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

    console.log('temporarySavedPostList', temporarySavedPostList)

    return <main className='flex flex-col'>TemporarySavedPostList</main>
}

export default TemporarySavedPostList
