import { serverRequestGetPostTagList } from '@/entities/post'
import { FC } from 'react'

const HomePage: FC = async () => {
    const res = await serverRequestGetPostTagList()

    console.log('tgas!!!!!!', res)

    return <main className='page-container pt-32 pb-10'></main>
}

export default HomePage
