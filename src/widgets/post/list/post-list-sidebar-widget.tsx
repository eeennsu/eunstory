import { PostCountInfo, PostSearch, PostTagsInfo } from '@/features/post/list'
import { Separator } from '@/lib/ui/separator'
import { MyProfile } from '@/shared/post/list'
import type { FC } from 'react'

export const PostListSidebarWidget: FC = async () => {
    return (
        <aside className='bg-gray-900 w-full md:w-64 p-6 rounded-lg shadow-lg flex flex-col gap-6 fixed top-[88px] bottom-0 h-[calc(100vh-88px)]'>
            <MyProfile />

            <Separator className='bg-gray-800' />

            <PostSearch />

            <PostTagsInfo />

            <Separator className='bg-gray-800' />

            <PostCountInfo />
        </aside>
    )
}
