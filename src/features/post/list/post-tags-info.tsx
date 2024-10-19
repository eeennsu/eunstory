import { serverRequestGetPostTagList } from '@/entities/post'
import { Badge } from '@/lib/ui/badge'
import type { FC } from 'react'

export const PostTagsInfo: FC = async () => {
    const tagsResponse = await serverRequestGetPostTagList()

    const postTags = 'error' in tagsResponse ? [] : tagsResponse.tags

    return (
        <section className='flex flex-col flex-grow gap-4'>
            <h3 className='text-lg font-semibold text-white flex items-center justify-between'>
                태그 목록
                <span className='bg-gray-800 text-gray-300 font-normal text-xs rounded-full px-3 py-1.5'>
                    {postTags.length} 개
                </span>
            </h3>

            {postTags.length !== 0 && (
                <div className='custom-scrollbar max-h-[calc(100vh-570px)] p-3 bg-gray-800/60 rounded-sm h-full'>
                    <div className='flex gap-2.5'>
                        {postTags.map((tag, index) => (
                            <Badge
                                key={index}
                                className='h-fit'
                                variant={'tag'}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}
