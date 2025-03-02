import { FC } from 'react'
import { INTRODUCE } from '@/shared/constants'

export const IntroductionSection: FC = () => {
    return (
        <section className='flex flex-col gap-4 break-keep flex-grow text-gray-300'>
            {INTRODUCE.map((intro) => (
                <p key={intro}>{intro}</p>
            ))}
        </section>
    )
}
