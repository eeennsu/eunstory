import type { FC } from 'react'

export const EmptyKeyword: FC = () => {
    return (
        <main className='page-container pt-28 max-w-[1200px] mx-auto text-center'>
            <p className='text-xl text-gray-500'>검색어를 입력해주세요.</p>
        </main>
    )
}
