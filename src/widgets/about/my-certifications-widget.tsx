import { AboutSectionTitle } from '@/shared/about/about-section-title'
import { MY_CERTIFICATIONS } from '@/shared/constants'
import { FC } from 'react'

export const MyCertificationsWidget: FC = () => {
    return (
        <section className='flex flex-col gap-8 w-full'>
            <AboutSectionTitle title='Certifications' />
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                {MY_CERTIFICATIONS.map((cert, index) => (
                    <li
                        key={index}
                        className='bg-slate-900/90 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col'>
                        <h3 className='text-2xl font-bold text-white'>{cert.name}</h3>
                        {cert.date && <p className='mt-2 text-sm text-gray-400'>취득일: {cert.date}</p>}
                        {cert.sub && <p className='mt-2 text-sm text-blue-400'>{cert.sub}</p>}
                    </li>
                ))}
            </ul>
        </section>
    )
}
