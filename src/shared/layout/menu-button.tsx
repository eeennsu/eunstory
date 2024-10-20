'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

interface Props {
    title: string
    url: string
    isActive: boolean
}

export const MenuButton: FC<Props> = ({ title, url, isActive }) => {
    return (
        <Link
            key={title}
            href={url}
            className={`relative text-sm md:text-base transition-all duration-200 ease-in-out ${
                isActive
                    ? 'text-indigo-400 font-semibold before:content-[""] before:absolute before:w-full before:h-[2px] before:bg-indigo-400 before:bottom-[-2px] before:left-0'
                    : 'text-slate-300/70 hover:text-slate-300 hover:scale-105'
            }`}>
            {title}
        </Link>
    )
}
