import {
    serverRequestGetActivePostCount,
    serverRequestGetPostListBySearch,
    serverRequestGetPostTagList,
    serverRequestGetSomePostList,
} from '@/entities/post'
import { FC } from 'react'

async function test() {
    const postTagList = serverRequestGetPostTagList()
    console.log('postTagList', postTagList)

    const responsePostList = await serverRequestGetSomePostList({ curPage: 1, perPage: 5, isPublished: true })

    console.log('responsePostList', responsePostList)

    const responseSearchedResult = await serverRequestGetPostListBySearch('test')

    console.log('responseSearchedResult', responseSearchedResult)

    const postTotalResponse = await serverRequestGetActivePostCount({ lastThreeMonths: true })

    console.log('postTotalResponse', postTotalResponse)
}

test()

const HomePage: FC = async () => {
    return <main className='page-container pt-32 pb-10'></main>
}

export default HomePage
