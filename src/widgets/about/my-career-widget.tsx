'use client'

import type { FC } from 'react'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import { MY_HISTORY } from '@/shared/constants'
import { AboutSectionTitle } from '@/shared/about/about-section-title'
import { VerticalTimelineItem } from '@/features/about'

export const MyCareerWidget: FC = () => {
    return (
        <section className='flex flex-col gap-6 w-full pt-24'>
            <AboutSectionTitle title='Career' />
            <VerticalTimeline>
                {MY_HISTORY.map((history, idx) => (
                    <VerticalTimelineItem
                        key={idx}
                        isRecent={idx === 0}
                        {...history}
                    />
                ))}
            </VerticalTimeline>
        </section>
    )
}
