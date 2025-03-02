import { ContactLinksSection, IntroductionSection, ProfileSection } from '@/features/home'
import { FC } from 'react'

const HomePage: FC = () => {
    return (
        <main className='page-container pt-44 max-w-4xl flex items-center pb-4 flex-col gap-12 mx-auto text-gray-200'>
            <div className='flex flex-col gap-10'>
                <ProfileSection />
                <IntroductionSection />
            </div>
            <ContactLinksSection />
        </main>
    )
}

export default HomePage
