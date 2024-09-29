import { FC } from 'react'

const HomePage: FC = async () => {
    return (
        <main className='page-container'>
            <div className='flex flex-col bg-white gap-4'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className='h-40 bg-blue-300'>
                        <h1>Page Item {index}</h1>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default HomePage
