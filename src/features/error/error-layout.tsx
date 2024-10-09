import type { FC } from 'react'
import { useRouter } from 'next/navigation'
import { mainPath } from '@/lib/route'

interface Props {
    error: Error | string
    reset: () => void
}

export const ErrorLayout: FC<Props> = ({ error, reset }) => {
    const router = useRouter()

    return (
        <main className='flex-grow bg-gray-900 flex flex-col items-center justify-center'>
            <div className='bg-gray-800 shadow-lg rounded-lg p-8 max-w-3xl w-full text-center'>
                <h1 className='text-3xl font-bold text-gray-100 mb-6'>Oops! Something went wrong</h1>
                <p className='text-gray-400 mb-8 break-words'>{error instanceof Error ? error.message : error}</p>
                <div className='flex flex-col gap-2 w-36 mx-auto'>
                    <button
                        onClick={() => reset()}
                        className='px-5 py-3 bg-teal-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 mb-4'>
                        Try Again
                    </button>
                    <button
                        onClick={() => router.replace(mainPath.home())}
                        className='px-5 py-3 bg-gray-700 text-gray-100 font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200'>
                        Home
                    </button>
                </div>
            </div>
        </main>
    )
}
