import { serverRequestGetPostListBySearch } from '@/entities/post'
import { FC } from 'react'

interface Props {
    searchParams: {
        keyword?: string
    }
}

const PostSearchPage: FC<Props> = async ({ searchParams }) => {
    const keyword = searchParams?.keyword

    if (!keyword) {
        return <main className='page-container pt-28 max-w-[1200px] mx-auto'>검색어가 없습니다.</main>
    }

    const responseSearchedResult = await serverRequestGetPostListBySearch(keyword)

    return (
        <main className='page-container pt-28 max-w-[1200px] mx-auto'>
            <h1>{searchParams.keyword} 검색 결과</h1>
        </main>
    )
}

export default PostSearchPage
