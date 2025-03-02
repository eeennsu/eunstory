import { HOME_TITLE } from '@/shared/constants'
import Image from 'next/image'
import { FC } from 'react'

export const ProfileSection: FC = () => {
    return (
        <section className='flex flex-col gap-4 items-center'>
            <figure className='relative w-40 h-40 rounded-full overflow-hidden shadow-lg'>
                <Image
                    src='/images/main-me.jpeg' // 사진의 올바른 경로로 수정
                    alt='Eunsu Bang'
                    className='rounded-full'
                    fill
                />
            </figure>
            <figcaption className='text-4xl font-bold text-gray-50'>{HOME_TITLE}</figcaption>
        </section>
    )
}
