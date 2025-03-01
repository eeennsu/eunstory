import { ContactLinksSection, IntroductionSection, ProfileSection } from '@/features/home'
import { FC } from 'react'

const HomePage: FC = () => {
    return (
        <main className='page-container justify-between pt-44 max-w-4xl flex items-center pb-4 flex-col gap-10 mx-auto text-gray-200'>
            <div className='flex flex-col gap-14'>
                <ProfileSection />
                <IntroductionSection />
            </div>
            <ContactLinksSection />
        </main>
    )
}

export default HomePage
