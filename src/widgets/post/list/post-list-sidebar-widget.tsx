import { serverRequestGetActivePostCount, serverRequestGetPostTagList } from '@/entities/post'
import { Badge } from '@/lib/ui/badge'
import { Input } from '@/lib/ui/input'
import { Separator } from '@/lib/ui/separator'
import { Search } from 'lucide-react'
import type { FC } from 'react'

export const PostListSidebarWidget: FC = async () => {
    const tagsResponse = await serverRequestGetPostTagList()
    const postTotalResponse = await serverRequestGetActivePostCount({ lastThreeMonths: true })

    const postTags = 'error' in tagsResponse ? [] : tagsResponse.tags
    const activePostCount = 'error' in postTotalResponse ? [] : postTotalResponse.activeCount
    const threeMonthPostCount = 'error' in postTotalResponse ? [] : postTotalResponse.activeCount

    return (
        <aside className='bg-gray-900 w-full md:w-64 p-6 rounded-lg shadow-lg flex flex-col gap-6 fixed top-[88px] bottom-0 h-[calc(100vh-88px)]'>
            <div className='flex flex-col items-center text-center'>
                <div className='size-24 bg-gray-700 rounded-full flex items-center justify-center'>
                    <span className='text-lg font-bold text-gray-400'>내 사진</span>
                </div>
                <h2 className='text-xl font-semibold text-white mt-4 leading-relaxed'>
                    프론트엔드 개발자 <br /> 방은수의 기록들
                </h2>
            </div>

            <Separator className='bg-gray-800' />

            <div className='relative'>
                <Input
                    type='text'
                    placeholder='검색어를 입력하세요...'
                    variant='clear'
                    className='flex-1 p-3 rounded-l-md bg-gray-800 pr-0 text-white placeholder:text-gray-500 h-10'
                />
                <span className='absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer'>
                    <Search size={18} />
                </span>
            </div>

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

            <Separator className='bg-gray-800' />

            <div className='flex justify-around text-center text-gray-400'>
                <div>
                    <p className='text-xs uppercase tracking-wide'>전체</p>
                    <p className='text-xl font-semibold text-white'>{activePostCount}</p>
                </div>
                <div>
                    <p className='text-xs uppercase tracking-wide'>최근 3개월 글</p>
                    <p className='text-xl font-semibold text-white'>{threeMonthPostCount}</p>
                </div>
            </div>
        </aside>
    )
}
