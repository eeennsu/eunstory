import { AboutSectionTitle } from '@/shared/about/about-section-title'
import { MY_CERTIFICATIONS } from '@/shared/constants'
import { FC } from 'react'

export const MyCertificationsWidget: FC = () => {
    return (
        <section className='flex flex-col gap-6 w-full'>
            <AboutSectionTitle title='Certification' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {MY_CERTIFICATIONS.map((cert, index) => (
                    <li
                        key={index}
                        className='bg-white p-6 rounded-lg shadow-lg flex flex-col'>
                        <h3 className='text-xl font-semibold text-gray-800'>{cert.name}</h3>
                        {cert.date && <p className='mt-2 text-sm text-gray-500'>취득일: {cert.date}</p>}
                        {cert.sub && <p className='mt-2 text-sm text-blue-600'>{cert.sub}</p>}
                    </li>
                ))}
            </ul>
        </section>
    )
}
