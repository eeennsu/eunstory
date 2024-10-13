import type { FC } from 'react'
import { MySkillsWidget, MyCareerWidget, MyCertificationsWidget } from '@/widgets/about'

const AboutPage: FC = () => {
    return (
        <main className='flex flex-col gap-28 w-full max-w-[85%] lg:max-w-[80%] mx-auto pt-32 pb-10'>
            <MyCareerWidget />
            <MySkillsWidget />
            <MyCertificationsWidget />
        </main>
    )
}

export default AboutPage
