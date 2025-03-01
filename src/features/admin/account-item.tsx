import { Account } from '@/widgets/admin'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

interface Props {
    account: Account
}

export const AccountItem: FC<Props> = ({ account }) => {
    const { user } = account
    const profileImage = user?.image || '/images/default-profile.png' // 기본 이미지 추가
    const userName = user?.name || 'Anonymous'
    const userEmail = user?.email || 'No email provided'

    const AccountContent = (
        <div className='flex flex-col items-center text-center rounded-lg p-5 hover:ring hover:ring-gray-700'>
            <Image
                src={profileImage}
                alt={userName}
                width={80}
                height={80}
                className='rounded-full mb-4 border-4 border-gray-600'
            />
            <p className='text-xl font-semibold text-gray-200 mb-2'>{userName}</p>
            <p className='text-sm text-gray-400 mb-4'>{userEmail}</p>
            <span className='bg-teal-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full'>
                {account.provider}
            </span>
        </div>
    )

    return user?.url ? (
        <Link
            href={user.url}
            prefetch={false}>
            {AccountContent}
        </Link>
    ) : (
        AccountContent
    )
}
