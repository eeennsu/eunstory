import { serverRequestGetPostListBySearch } from '@/entities/post'
import { SearchedPostItem } from '@/features/post/search'
import { EmptyKeyword, SearchResult } from '@/shared/post/search'
import { FC } from 'react'

interface Props {
    searchParams: Promise<{
        keyword?: string
    }>
}

const PostSearchPage: FC<Props> = async ({ searchParams }) => {
    const keyword = (await searchParams)?.keyword

    if (!keyword) {
        return <EmptyKeyword />
    }

    const responseSearchedResult = await serverRequestGetPostListBySearch(keyword)

    if ('error' in responseSearchedResult) {
        throw responseSearchedResult.error
    }

    return (
        <section className='flex flex-col gap-6 lg:px-20 md:px-14 px-8 pb-10'>
            <SearchResult keyword={keyword} />
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {responseSearchedResult.posts.length > 0 ? (
                    responseSearchedResult.posts.map((post) => (
                        <SearchedPostItem
                            key={post.id}
                            post={post}
                        />
                    ))
                ) : (
                    <p className='text-lg text-gray-400 col-span-full'>검색 결과가 없습니다.</p>
                )}
            </section>
        </section>
    )
}

export default PostSearchPage

export const dynamic = 'force-dynamic'
