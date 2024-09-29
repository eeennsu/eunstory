import type { FC } from 'react'
import { SkillSection } from '@/shared/about'
import { MY_SKILLS, SkillLevel } from '@/shared/constants'
import { AboutSectionTitle } from '@/shared/about/about-section-title'

export const MySkillsWidget: FC = () => {
    return (
        <section className='flex flex-col gap-6 w-full'>
            <AboutSectionTitle title='Skills' />

            <ul className='flex gap-9 justify-around'>
                {Object.entries(MY_SKILLS).map(([key, value]) => (
                    <SkillSection
                        key={key}
                        level={key as SkillLevel}
                        skills={value}
                    />
                ))}
            </ul>
        </section>
    )
}
