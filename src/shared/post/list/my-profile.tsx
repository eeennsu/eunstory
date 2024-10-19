import { poorStory } from '@/lib/font'
import { cn } from '@/lib/shadcn/shadcn-utils'
import TypingAnimation from '@/lib/ui/typing-animation'
import type { FC } from 'react'

export const MyProfile: FC = () => {
    return (
        <section className='flex flex-col items-center text-center gap-4'>
            <figure className='size-24 bg-gray-700 rounded-full flex items-center justify-center'>
                <span className='text-lg font-bold text-gray-400'>내 사진</span>
            </figure>
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
