import { ContactLink } from '@/shared/home'
import { FC } from 'react'

export const ContactLinksSection: FC = () => {
    return (
        <section className='flex w-full gap-0.5 justify-between px-14'>
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
