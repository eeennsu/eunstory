import type { FC } from 'react'

interface Props {
    title: string
}

export const DashboardDataTitle: FC<Props> = ({ title }) => {
    return <h2 className='text-lg font-semibold text-gray-300'>{title}</h2>
}
