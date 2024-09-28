import type { FC } from 'react'

interface Props {
    title: string
}

export const AboutSectionTitle: FC<Props> = ({ title }) => {
    return <h2 className='font-bold text-4xl'>{title}</h2>
}
