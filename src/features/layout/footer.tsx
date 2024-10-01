import type { FC } from 'react'

export const Footer: FC = () => {
    return (
        <footer className='flex items-center justify-center w-full py-10 bg-gray-900 text-white z-[10] border-t border-t-gray-500'>
            <div className='text-sm'>Copyright {new Date().getFullYear()} Eunstory. All rights reserved.</div>
        </footer>
    )
}
