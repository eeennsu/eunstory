import { CircleArrowOutUpLeft } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
    href: string
    text: string
    isMainLink?: boolean
}

export const SideMenuButton: FC<Props> = ({ href, text, isMainLink = false }) => {
    return (
        <Link
            href={href}
            className='text-base flex items-center gap-2 justify-center font-semibold text-gray-200 px-3 py-3 rounded-lg w-full transition-all duration-300 hover:scale-105 hover:bg-gray-700/40'>
            {isMainLink && <CircleArrowOutUpLeft size={16} />}
            {text}
        </Link>
    )
}
