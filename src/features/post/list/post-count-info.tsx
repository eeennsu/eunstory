'use client'

import { requestGetActivePostCount } from '@/entities/post'
import { useAsync } from '@/lib/hooks'
import NumberTicker from '@/lib/ui/number-ticker'
import { useState, type FC } from 'react'

const RECENTLY_MONTH = 3

export const PostCountInfo: FC = () => {
    const [postCount, setPostCount] = useState({ total: 0, threeMonth: 0 })

    const { isLoading, error } = useAsync(async () => {
        const [totalResponse, recentlyResponse] = await Promise.all([
            requestGetActivePostCount(),
            requestGetActivePostCount(RECENTLY_MONTH),
        ])

        if ('activeCount' in totalResponse && 'activeCount' in recentlyResponse) {
            setPostCount({
                total: totalResponse.activeCount,
                threeMonth: recentlyResponse.activeCount,
            })
        }
    }, [])

    return (
        <section className='flex justify-around text-center text-gray-400'>
            <div className='flex flex-col gap-0.5'>
                <p className='text-xs uppercase tracking-wide'>전체</p>
                {isLoading
                    ? '...'
                    : !error && (
                          <NumberTicker
                              className='text-xl font-semibold text-white'
                              value={postCount.total}
                          />
                      )}
            </div>

            <div className='flex flex-col gap-0.5'>
                <p className='text-xs uppercase tracking-wide'>최근 {RECENTLY_MONTH}개월 글</p>
                {isLoading
                    ? '...'
                    : !error && (
                          <NumberTicker
                              className='text-xl font-semibold text-white'
                              value={postCount.threeMonth}
                          />
                      )}
            </div>
        </section>
    )
}
