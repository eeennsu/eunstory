import { serverRequestGetActivePostCount } from '@/entities/post'
import NumberTicker from '@/lib/ui/number-ticker'
import type { FC } from 'react'

export const PostCountInfo: FC = async () => {
    const recentlyMonth = 3
    const [totalResponse, recentlyResponse] = await Promise.all([
        serverRequestGetActivePostCount(),
        serverRequestGetActivePostCount(recentlyMonth),
    ])

    const activePostCount = 'error' in totalResponse ? 0 : totalResponse.activeCount
    const threeMonthPostCount = 'error' in recentlyResponse ? 0 : recentlyResponse.activeCount

    return (
        <section className='flex justify-around text-center text-gray-400'>
            <div>
                <p className='text-xs uppercase tracking-wide'>전체</p>

                <NumberTicker
                    className='text-xl font-semibold text-white'
                    value={activePostCount}
                />
            </div>
            <div>
                <p className='text-xs uppercase tracking-wide'>최근 {recentlyMonth}개월 글</p>
                <NumberTicker
                    className='text-xl font-semibold text-white'
                    value={threeMonthPostCount}
                />
            </div>
        </section>
    )
}
