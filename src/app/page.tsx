import {
    serverRequestGetActivePostCount,
    serverRequestGetPostListBySearch,
    serverRequestGetPostTagList,
    serverRequestGetSomePostList,
} from '@/entities/post'
import { FC } from 'react'

async function test() {
    try {
        const postTagList = await serverRequestGetPostTagList()
        console.log('postTagList', postTagList)
    } catch (error) {
        console.log('Error fetching post tags:', error)
    }

    try {
        const responseSearchedResult = await serverRequestGetPostListBySearch('test')
        console.log('responseSearchedResult', responseSearchedResult)
    } catch (error) {
        console.log('Error fetching post list by search:', error)
    }

    try {
        const postTotalResponse = await serverRequestGetActivePostCount({ lastThreeMonths: true })
        console.log('postTotalResponse', postTotalResponse)
    } catch (error) {
        console.log('Error fetching active post count:', error)
    }

    try {
        const responsePostList = await serverRequestGetSomePostList({ curPage: 1, perPage: 5, isPublished: true })
        console.log('responsePostList', responsePostList)
    } catch (error) {
        console.log('Error fetching some post list:', error)
    }
}
test()

const HomePage: FC = async () => {
    return <main className='page-container pt-32 pb-10'></main>
}

export default HomePage
