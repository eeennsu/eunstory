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
            dateClassName={cn('font-semibold mt-4 !text-lg', isRecent ? 'text-blue-300' : 'text-gray-300')}
            contentStyle={{
                background: isRecent ? 'rgba(29, 78, 216, 0.9)' : 'rgba(51, 65, 85, 0.9)', // 어두운 블루와 slate 계열
                color: '#e5e7eb', // 텍스트는 밝은 그레이
                borderRadius: '12px',
                padding: '30px',
                boxShadow: isRecent ? '0 8px 16px rgba(29, 78, 216, 0.4)' : '0 8px 16px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: isRecent ? 'scale(1.05)' : 'scale(1)',
            }}
            iconStyle={{
                background: isRecent ? 'rgb(29, 78, 216)' : 'rgb(30, 41, 59)', // 다크 블루와 다크 slate 색상
                color: '#fff',
                marginTop: '20px',
                border: isRecent ? '4px solid rgb(29, 78, 216)' : '2px solid rgb(29, 78, 216)',
            }}
            contentArrowStyle={{
                marginTop: '16px',
                borderRight: '10px solid',
                borderRightColor: isRecent ? 'rgba(29, 78, 216, 0.9)' : 'rgba(51, 65, 85, 0.9)', // 화살표도 어두운 톤
                width: '16px',
                height: '16px',
            }}
            icon={<Icon />}>
            <div className='flex flex-col gap-5'>
                <div>
                    <h3 className={cn('text-2xl font-bold', isRecent ? 'text-white' : 'text-gray-200')}>{title}</h3>
                    <sub className={cn('text-sm', isRecent ? 'text-blue-200' : 'text-gray-400')}>{sub}</sub>
                </div>

                {description && description.length > 0 && (
                    <ul className='list-disc flex flex-col gap-1 ps-5'>
                        {description.map((desc, idx) => (
                            <li
                                key={idx}
                                className={cn(
                                    'text-base leading-relaxed',
                                    isRecent ? 'text-blue-100 font-semibold' : 'text-gray-300 font-medium'
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
