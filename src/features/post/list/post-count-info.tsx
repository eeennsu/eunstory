import { serverRequestGetActivePostCount } from '@/entities/post'
import NumberTicker from '@/lib/ui/number-ticker'
import type { FC } from 'react'

export const PostCountInfo: FC = async () => {
    const postTotalResponse = await serverRequestGetActivePostCount({ lastThreeMonths: true })
    if ('error' in postTotalResponse) {
        console.log('error in postTotalResponse', postTotalResponse.error)
        return null
    }

    const activePostCount = 'error' in postTotalResponse ? 0 : postTotalResponse.activeCount
    const threeMonthPostCount = 'error' in postTotalResponse ? 0 : postTotalResponse.activeCount

    return (
        <div className='flex justify-around text-center text-gray-400'>
            <div>
                <p className='text-xs uppercase tracking-wide'>전체</p>

                <NumberTicker
                    className='text-xl font-semibold text-white'
                    value={activePostCount}
                />
            </div>
            <div>
                <p className='text-xs uppercase tracking-wide'>최근 3개월 글</p>
                <NumberTicker
                    className='text-xl font-semibold text-white'
                    value={threeMonthPostCount}
                />
            </div>
        </div>
    )
}
