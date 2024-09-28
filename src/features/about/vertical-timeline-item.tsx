import { type FC } from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { CodeXml, GraduationCap, IdCard, User } from 'lucide-react'
import { MyHistory } from '@/shared/constants'
import { cn } from '@/lib/shadcn/shadcn-utils'

interface Props extends MyHistory {
    isRecent?: boolean
}

const iconMap = {
    'code-xml': CodeXml,
    'id-card': IdCard,
    'graduation-cap': GraduationCap,
    default: User,
}

export const VerticalTimelineItem: FC<Props> = ({ isRecent = false, title, sub, icon, date, description }) => {
    const Icon = iconMap[icon] || iconMap.default

    return (
        <VerticalTimelineElement
            visible
            className='vertical-timeline-element--work'
            date={date}
            dateClassName={cn('text-lg font-semibold mt-4', isRecent ? 'text-blue-500' : 'text-gray-600')}
            contentStyle={{
                background: isRecent ? 'rgb(33, 150, 243)' : 'rgb(245, 245, 245)',
                color: isRecent ? '#fff' : '#333',
                borderRadius: '12px',
                paddingInline: '26px',
                paddingBlock: '22px',
                boxShadow: isRecent ? '0 8px 16px rgba(33, 150, 243, 0.3)' : '0 8px 16px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: isRecent ? 'scale(1.05)' : 'scale(1)',
            }}
            iconStyle={{
                background: isRecent ? 'rgb(33, 150, 243)' : 'rgb(245, 245, 245)',
                color: isRecent ? '#fff' : 'rgb(33, 150, 243)',
                marginTop: '20px',
                border: isRecent ? '4px solid rgb(33, 150, 243)' : '2px solid rgb(33, 150, 243)',
            }}
            contentArrowStyle={{
                marginTop: '16px',
                borderRight: '10px solid',
                borderRightColor: isRecent ? 'rgb(33, 150, 243)' : 'rgb(245, 245, 245)',
                width: '16px',
                height: '16px',
            }}
            icon={<Icon />}>
            <div className='flex flex-col gap-5'>
                <div>
                    <h3 className={cn('text-2xl font-bold', isRecent ? 'text-white' : 'text-gray-900')}>{title}</h3>
                    <sub className={cn('text-sm', isRecent ? 'text-blue-200' : 'text-gray-500')}>{sub}</sub>
                </div>

                {description && description.length > 0 && (
                    <ul className='list-disc flex flex-col gap-1 ps-5'>
                        {description.map((desc, idx) => (
                            <li
                                key={idx}
                                className={cn(
                                    'text-base leading-relaxed',
                                    isRecent ? 'text-blue-100' : 'text-gray-700'
                                )}>
                                {desc}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </VerticalTimelineElement>
    )
}
