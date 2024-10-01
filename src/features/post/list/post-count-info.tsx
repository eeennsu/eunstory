import { serverRequestGetActivePostCount } from '@/entities/post'
import type { FC } from 'react'

export const PostCountInfo: FC = async () => {
    const postTotalResponse = await serverRequestGetActivePostCount({ lastThreeMonths: true })

    const activePostCount = 'error' in postTotalResponse ? 0 : postTotalResponse.activeCount
    const threeMonthPostCount = 'error' in postTotalResponse ? 0 : postTotalResponse.activeCount

    return (
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
    )
}
