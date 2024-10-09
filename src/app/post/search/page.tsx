import { serverRequestGetPostListBySearch } from '@/entities/post'
import { SearchedPostItem } from '@/features/post/search'
import { EmptyKeyword, SearchResult } from '@/shared/post/search'
import { FC } from 'react'

interface Props {
    searchParams: {
        keyword?: string
    }
}

const PostSearchPage: FC<Props> = async ({ searchParams }) => {
    const keyword = searchParams?.keyword

    if (!keyword) {
        return <EmptyKeyword />
    }

    const responseSearchedResult = await serverRequestGetPostListBySearch(keyword)

    if ('error' in responseSearchedResult) {
        throw responseSearchedResult.error
    }

    return (
        <main className='page-container pt-32 pb-10 max-w-[1200px] mx-auto gap-5'>
            <SearchResult keyword={keyword} />
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
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
        </main>
    )
}

export default PostSearchPage
