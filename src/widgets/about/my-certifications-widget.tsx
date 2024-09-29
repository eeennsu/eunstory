import { CertificationItem } from '@/shared/about'
import { AboutSectionTitle } from '@/shared/about/about-section-title'
import { MY_CERTIFICATIONS } from '@/shared/constants'
import { FC } from 'react'

export const MyCertificationsWidget: FC = () => {
    return (
        <section className='flex flex-col gap-6 w-full'>
            <AboutSectionTitle title='Certifications' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                {MY_CERTIFICATIONS.map((certification) => (
                    <CertificationItem
                        key={certification.name}
                        {...certification}
                    />
                ))}
            </ul>
        </section>
    )
}
