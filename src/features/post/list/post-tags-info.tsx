import { serverRequestGetPostTagList } from '@/entities/post'
import { Badge } from '@/lib/ui/badge'
import type { FC } from 'react'

export const PostTagsInfo: FC = async () => {
    const tagsResponse = await serverRequestGetPostTagList()

    const postTags = 'error' in tagsResponse ? [] : tagsResponse.tags

    return (
        <div className='flex flex-col flex-grow gap-4'>
            <h3 className='text-lg font-semibold text-white flex items-center justify-between'>
                <span>태그 전체보기</span>
                <span className='bg-gray-800 text-gray-300 font-normal text-xs rounded-full px-2 py-1'>
                    {postTags.length} 개
                </span>
            </h3>

            <div className='custom-scrollbar flex-grow flex flex-wrap gap-2 p-3 rounded-lg bg-gray-800 max-h-[calc(100vh-570px)]'>
                {postTags.map((tag) => (
                    <Badge
                        key={tag}
                        variant={'tag'}>
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    )
}
