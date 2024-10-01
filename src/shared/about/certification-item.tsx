import type { FC } from 'react'
import { MyCertification } from '../constants'

interface Props extends MyCertification {}

export const CertificationItem: FC<Props> = ({ name, date, sub }) => {
    return (
        <li className='bg-slate-900/90 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col'>
            <h3 className='text-2xl font-bold text-white'>{name}</h3>
            {date && <p className='mt-2 text-sm text-gray-400'>취득일: {date}</p>}
            {sub && <p className='mt-2 text-sm text-gray-400'>{sub}</p>}
        </li>
    )
}
 