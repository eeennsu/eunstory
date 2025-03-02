'use client'

import { requestGetPostTagList } from '@/entities/post'
import { useAsync } from '@/lib/hooks'
import { Badge } from '@/lib/ui/badge'
import { useState, type FC } from 'react'

export const PostTagsInfo: FC = () => {
    const [postTags, setPostTags] = useState<string[]>([])
    const { isLoading, error } = useAsync(async () => {
        const responseComments = await requestGetPostTagList()

        if ('error' in responseComments) {
            setPostTags([])
            return
        }

        setPostTags(responseComments.tags)
    }, [])

    return (
        <section className='flex flex-col flex-grow gap-4'>
            <h3 className='text-lg font-semibold text-white flex items-center justify-between'>
                태그 목록
                <span className='bg-gray-800 text-gray-300 font-normal text-xs rounded-full px-3 py-1.5'>
                    {postTags.length} 개
                </span>
            </h3>

            <div className='custom-scrollbar max-h-[calc(100vh-600px)] p-3 bg-gray-800/60 rounded-sm h-full'>
                <div className='flex gap-2.5'>
                    {isLoading
                        ? Array.from({ length: 5 }, (_, index) => (
                              <Badge
                                  key={index}
                                  className='h-6 w-9 animate-pulse'
                                  variant={'tag'}></Badge>
                          ))
                        : !error &&
                          postTags.map((tag, index) => (
                              <Badge
                                  key={index}
                                  className='h-fit'
                                  variant={'tag'}>
                                  {tag}
                              </Badge>
                          ))}
                </div>
            </div>
        </section>
    )
}
