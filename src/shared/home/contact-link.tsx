import { cn } from '@/lib/shadcn/shadcn-utils'
import Link, { LinkProps } from 'next/link'
import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react'

type AElementProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

type Props = {
    className?: string
    label: string
} & LinkProps &
    AElementProps

export const ContactLink: FC<Props> = ({ label, className, ...linkProps }) => {
    return (
        <p className={cn('flex items-center gap-2', className)}>
            <span className='text-gray-300 font-bold'>{label}:</span>
            <Link
                {...linkProps}
                className='text-blue-400 hover:underline'>
                {linkProps.href.startsWith('mailto') ? linkProps.href.split(':')[1] : linkProps.href}
            </Link>
        </p>
    )
}
