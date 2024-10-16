import { FC } from 'react'

console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)
console.log('DATABASE_URL:', process.env.DATABASE_URL)

const HomePage: FC = async () => {
    return <main className='page-container pt-32 pb-10'></main>
}

export default HomePage
