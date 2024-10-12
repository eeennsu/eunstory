import Link from 'next/link'
import type { FC } from 'react'

interface Props {
    href: string
    text: string
}

export const SideMenuButton: FC<Props> = ({ href, text }) => {
    return (
        <Link
            href={href}
            className='text-base font-semibold text-gray-200 px-3 py-3 rounded-lg w-full text-center transition-all duration-300 hover:scale-105 hover:bg-gray-700/40'>
            {text}
        </Link>
    )
}
