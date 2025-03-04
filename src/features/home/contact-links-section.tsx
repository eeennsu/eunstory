import { ContactLink } from '@/shared/home'
import { FC } from 'react'

export const ContactLinksSection: FC = () => {
    return (
        <section className='grid grid-cols-2 gap-x-40 gap-y-4'>
            <ContactLink
                label='Resume'
                href='http://eunsu-resume.eunsu.kr'
                target='_blank'
                rel='noopener noreferrer'
            />
            <ContactLink
                label='GitHub'
                href='https://github.com/eeennsu'
                target='_blank'
                rel='noopener noreferrer'
            />
            <ContactLink
                label='Email'
                href='mailto:xxx592@naver.com'
            />
            <ContactLink
                label='Velog'
                href='https://velog.io/@diso592/posts'
                target='_blank'
                rel='noopener noreferrer'
            />
        </section>
    )
}
