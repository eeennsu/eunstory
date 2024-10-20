import { poorStory } from '@/lib/font'
import { cn } from '@/lib/shadcn/shadcn-utils'
import TypingAnimation from '@/lib/ui/typing-animation'
import Image from 'next/image'
import type { FC } from 'react'

export const MyProfile: FC = () => {
    return (
        <section className='flex flex-col items-center text-center gap-4'>
            <Image
                src='/images/me.jpeg'
                alt='me'
                className='rounded-full object-contain'
                width={104}
                height={104}
            />

            <TypingAnimation
                className={cn(
                    'text-xl font-semibold w-[150px] text-white leading-relaxed break-words h-[66px]',
                    poorStory.className
                )}
                text='프론트엔드 개발자 방은수의 기록'
            />
        </section>
    )
}
