import { Account } from '@/widgets/admin'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
    account: Account
}

export const AccountItem: FC<Props> = ({ account }) => {
    const Comp = account.user?.url ? Link : 'div'

    return (
        <Comp
            href={account.user?.url || '#'}
            key={account.id}
            prefetch={false}
            className='flex flex-col items-center text-center rounded-lg p-5 hover:ring hover:ring-gray-700'>
            <Image
                src={account.user.image || ''}
                alt='user-image'
                width={80}
                height={80}
                className='rounded-full mb-4 border-4 border-gray-600'
            />
            <p className='text-xl font-semibold text-gray-200 mb-2'>{account.user.name || 'Anonymous'}</p>
            <p className='text-sm text-gray-400 mb-4'>{account.user.email || 'No email provided'}</p>
            <span className='bg-teal-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full'>
                {account.provider}
            </span>
        </Comp>
    )
}
