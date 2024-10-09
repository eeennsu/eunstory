import type { FC } from 'react'

interface Props {
    keyword: string
}

export const SearchResult: FC<Props> = ({ keyword }) => {
    return (
        <h1 className='text-2xl font-bold text-gray-200 '>
            <span className='text-indigo-400'>{keyword}</span> 검색 결과
        </h1>
    )
}
